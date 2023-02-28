 import {createSlice} from "@reduxjs/toolkit";
 import axios from 'axios';
 import {message} from 'antd';
 import { keyUri,config } from "../key";

 const initialState ={
    all_leave:[],
    loading:false,
    hasError:false,
    current_leave:[],
    status_count:5
 }

 export const leaveRequestSlice = createSlice({
    name:'leaverequest',
    initialState,
    reducers:{
        getLeave:state =>{
            state.loading = true;
        },
        getAllLeave:(state,{payload}) =>{
            state.loading = false;
            console.log("DataIs:",payload)
            state.all_leave = payload.leave
            // state.status_count = state.status_count+1   
        },
        getCurrentLeave:(state,{payload})=>{
            state.loading = false
            state.current_leave = payload.leave
            state.status_count = payload.status_count+1
        },
        getLeaveFailure:(state)=>{
            state.loading =  false
            state.hasError = true
        },
    },
 })

 export const {getLeave,getAllLeave,getCurrentLeave,getLeaveFailure} = 
 leaveRequestSlice.actions;

 export const leaveRequestSelector = state => state.leave;


 export const fetchEmployeeLeave = (id,role) => async dispatch =>{
    dispatch(getLeave())
    try{
        
        const {data} = await axios.get(keyUri.BACKEND_URI+`/leavrequest-employee/${id}?role=${role}`)
        console.log(data)
        dispatch(getAllLeave(data))

    }
    catch(error){
        dispatch(getLeaveFailure())
    }

 }

 export const fetchAllLeave = (id) => async dispatch =>{
    dispatch(getLeave())
    try{
        const {data} = await axios.get(keyUri.BACKEND_URI+`/leaverequest`)
        console.log(data)
        dispatch(getAllLeave(data))

    }
    catch(error){
        dispatch(getLeaveFailure())
    }

 }

 export const fetchOneLeave = (id)=> async dispatch =>{
    console.log(id)
    dispatch(getLeave())
    try{
        const {data} = await axios.get(keyUri.BACKEND_URI+`/leaverequest/${id}`)
        console.log(data)
        dispatch(getCurrentLeave(data))
    }
    catch(error){
        dispatch(getLeaveFailure())
    }
 };

export const deleteLeave = (id,leave) => async dispatch =>{
    dispatch(getLeave())
    const key = 'delete'
    message.loading({content:'loading....',key})
    try{
        const {data} = await axios.delete(keyUri.BACKEND_URI+`/leaverequest/${id}`,leave,config)
        data && message.success({content:data.msg,key,duration:2});
        dispatch(fetchAllLeave())
    }
    catch(error){
        dispatch(getLeaveFailure())
    }
};

 export const createLeave = (values) => async dispatch =>{
    dispatch(getLeave())
    const key ='create';
    message.loading({content:'loading.....',key})
    try{
        const {data} = await axios.post(keyUri.BACKEND_URI+`/leaverequest`,values,config)
        data && message.success({content:data.msg,key,duration:2})
        dispatch(fetchAllLeave())
        window.location.reload()
    }
    catch({response}){
        response.data && message.error({content:response.data.msg,key,duration:2})
        dispatch(getLeaveFailure())
    }

 };


 export const  updateLeave = (id, values) => async dispatch =>{
    
    const key = "leaverequest"
    dispatch(getLeave())
    message.loading({ content: 'loading...', key })
  
  try {
      const {data} = await axios.put(keyUri.BACKEND_URI +`/leaverequest/${id}`, values, config);
      console.log(data);
      data && message.success({ content: data.msg, key, duration: 2 });
      dispatch(fetchAllLeave())
      window.location.reload()
  
  } catch ({response}) {
      console.log(response.data);
      dispatch(getLeaveFailure())
  }
  }





export default leaveRequestSlice.reducer;



