import { createSlice } from "@reduxjs/toolkit";
import axios from 'axios';
import {message} from 'antd';
import { keyUri,config } from "../key";

const initialState = {
    all_todo:[],
    loading:false,
    hasError:false,
    current_todo:[],
}

export const todoSlice = createSlice({
    name:'todolist',
    initialState,
    reducers:{
        getTodo:state=>{
            state.loading = true;
        },
        getAll_todo:(state,{payload})=>{
            state.loading = false
            state.all_todo = payload.todolist
        },
        getCurrentTodo:(state,{payload}) =>{
            state.loading = false
            state.current_todo =  payload.todolist
        },
        getTodoFailure:(state)=>{
            state.loading = false
            state.hasError = true
        },
    },
})

export const {getTodo,getAll_todo,getCurrentTodo,getTodoFailure} =
todoSlice.actions;

export const todolistSelector = state =>state.todolist;

export const fetchAllTodo = (id)=> async dispatch =>{

    dispatch(getTodo())
    console.log("Fecching todo......",id)

    try{
        if(id){

            const {data} = await axios.get(keyUri.BACKEND_URI+`/todolist/${id}`)
            console.log("The data is ", data)
    
            dispatch(getAll_todo(data));
        }
        else{
            const {data} = await axios.get(keyUri.BACKEND_URI+`/todolist`)
            dispatch(getAll_todo(data));
         }

    }catch(error){
        dispatch(getTodoFailure())
    }
};

export const deleteTodo = (id,todolist) =>async dispatch =>{
    console.log("Inside delete todo....")
    dispatch(getTodo())
    const key = 'create'
    message.loading({content:'loading....',key})
    try{
        const {data} = await axios.delete(keyUri.BACKEND_URI+`/todolist/${id}`,todolist,config)
   
        data && message.success({content:data.msg,key,duration:2});
        dispatch(fetchAllTodo(id));
    }catch(error){
        dispatch(getTodoFailure())
    }
    
};


export const createTodo = (value) =>async dispatch =>{
    console.log(value);
    dispatch(getTodo())
    const key = 'create';
    message.loading({content:'loading....',key})
    try{
        const {data} = await axios.post(keyUri.BACKEND_URI+`/todolist`,value,config)
        data && message.success({content:data.msg,key,duration:3});
        dispatch(fetchAllTodo());
        window.location.reload()
    }
    catch({error}){
        error.data && message.error({content:error.data.msg,key,duration:3})
        dispatch(getTodoFailure())
    }
}

export const fetchOneTodo = (id) =>async dispatch =>{
    console.log(id)
  dispatch(getTodo())
  
  try{
    const {data} =  await axios.get(keyUri.BACKEND_URI+`/todolist/${id}`)
    console.log("The Data is",data.todolist);
    dispatch(getCurrentTodo(data));
    // return data.todolist;
  }catch(error){
    dispatch(getTodoFailure())
  }
};



export const  updateTodo = (id, values) => async dispatch =>{
    const key = "title"
    dispatch(getTodo())
    console.log("Update id s",id)
    console.log(values)

    message.loading({ content: 'loading...', key })
  
  try {
      const {data} = await axios.put(keyUri.BACKEND_URI +`/todolist/${id}`, values, config);
      console.log(data);
      
      data && message.success({ content: data.msg, key, duration: 2 });
      // dispatch(fetchAllemployee())
      window.location.reload()
       
  
  } catch ({response}) {
  
       console.log(response.data);
        
      dispatch(getTodoFailure())
     
  
  }
  }



export default todoSlice.reducer;