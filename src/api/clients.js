import { message } from "antd";
import { createSlice } from '@reduxjs/toolkit';
import axios from "axios";
import { keyUri,config } from "../key";

const initialState ={
    all_client:[],
    loading:false,
    hasError:false,
    current_client:[],
}

export const ClientSlice = createSlice({
    name:'client',
    initialState,
    reducers:{
        getClient:state =>{
            state.loading = true;
        },
        getAll_Client:(state,{payload})=>{
            state.loading = false;
            console.log("all_client",payload)
            state.all_client = payload.client
        },
        getCurrentClient:(state,{payload}) =>{
            state.loading = false
            state.current_client = payload.client
        },
        getClientfailure:(state)=>{
            state.loading = false
            state.hasError = true
        },
    },
})


export const {getClient,getAll_Client,getCurrentClient,getClientfailure}=
ClientSlice.actions;

export const clientSelector = state => state.client;

export const createClient = (value) =>async dispatch =>{
    const key = 'create'
    message.loading({content:'loading....',key})
    try{
        const {data} = await axios.post(keyUri.BACKEND_URI+`/client`,value,config)
        data && message.success({content:data.msg,key,duration:3});
        dispatch(fetchAllClient())
        window.location.reload()
    }
    catch(error){
        error.data && message.error({content:error.data.msg,key,duration:3})
        dispatch(getAll_Client())
    }
}


export const  fetchAllClient = (id) => async dispatch =>{
    dispatch(getClient())
    
    try{ 
        const {data} = await axios.get(keyUri.BACKEND_URI+`/client`)
        dispatch(getAll_Client(data))
    }
    catch(error){
        dispatch(getClientfailure())
    }
}

export const fetchOneClient = (id) => async dispatch =>{
    dispatch(getClient())
    try{
        const {data} = await axios.get(keyUri.BACKEND_URI+`/client/${id}`)
        console.log(data)
        dispatch(getCurrentClient(data))
    }
    catch(error){
        dispatch(getClientfailure())
    }
}

export const deleteClient = (id,client) =>async dispatch =>{
    dispatch(getClient())
    const key = 'delete'
    message.loading({content:'loading....',key})
    try{
        const {data} = await axios.delete(keyUri.BACKEND_URI+`/client/${id}`,client,config)
        data && message.success({content:data.msg,key,duration:3})
        dispatch(fetchAllClient(id))
    }    
    catch(error){
        dispatch(getClientfailure())
    }
};

export const updateClient = (id,values) =>async dispatch =>{
    const key = 'update'
    dispatch(getClient())
    message.loading({content:'loading....',key})
    try{
        const {data} = await axios.put(keyUri.BACKEND_URI+`/client/${id}`,values,config)
        data && message.success({content:data.msg,key,duration:3})
        window.location.reload()
    }
    catch({response}){
        dispatch((getClientfailure()))
    }
}


export default ClientSlice.reducer;

