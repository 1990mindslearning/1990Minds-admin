import { createSlice } from "@reduxjs/toolkit"
import { message } from "antd";
import axios from "axios";
import { keyUri,config } from "../key";

const user =  localStorage.getItem('userinfo') ?
 JSON.parse(localStorage.getItem('userinfo'))  : null

const initialState = {
    all_credential:[],
    loading:false,
    hasError:false,
    current_credential:[],
}

export const credentialSlice = createSlice({
    name:'credential',
    initialState,
    reducers:{
        getCredential :state =>{
            state.loading = true;
        },
        getAllCredential:(state,{payload})=>{
            state.loading = false
            state.all_credential = payload.credential
           
        },
        getCurrentCredential :(state,{payload})=>{
            state.loading = false;
            state.current_credential = payload.credential
        },
        getCredentialFailure:(state)=>{
            state.loading = false
            state.hasError = true
        },


    },
})


export const {getCredential,getAllCredential,getCurrentCredential,getCredentialFailure}=
credentialSlice.actions;

export const credentialSelector = state => state.credential;

export const createCredential = (value)=>async dispatch =>{
    const key = 'create'
    message.loading({content:'loading....',key})
    try{
        const {data} = await axios.post(keyUri.BACKEND_URI+`/credential`,value,config)
        data && message.success({content:data.msg,key,duration:3})
        dispatch(fetchAllCredential())
        window.location.reload()
    }
    catch(error){
        error.data && message.error({content:error.data.msg,key,duration:3})
        dispatch(getAllCredential())
    }
}


export const fetchAllCredential = ()=> async dispatch =>{
    dispatch(getCredential())
    try{
        const {data} = await axios.get(keyUri.BACKEND_URI+`/credential`)
        dispatch(getAllCredential(data))
    }
    catch(error){
        dispatch(getCredentialFailure())
    }
}

export const fetchOneCredential = (id) => async dispatch =>{
  
    dispatch(getCredential())
    try{
        const {data} = await axios.get(keyUri.BACKEND_URI+`/credential/${id}`)
        console.log(data)
        dispatch(getCurrentCredential(data))
    }
    catch(error){
        dispatch(getCredentialFailure())
    }
}


export const updateCredential = (id,values) =>async dispatch =>{
    const key = 'update'
    dispatch(getCredential())
    message.loading({content:'loading....',key})
    try{
        const {data} = await axios.put(keyUri.BACKEND_URI+`/credential/${id}`,values,config)
        data && message.success({content:data.msg,key,duration:3})
        window.location.reload()
    }
    catch({response}){
        dispatch(getCredentialFailure())
    }
}
export const deleteCredential = (id,credential) =>async dispatch =>{
    dispatch(getCredential())
    const key = 'delete'
    message.loading({content:'loading....',key})
    try{
        const {data} = await axios.delete(keyUri.BACKEND_URI+`/credential/${id}`,credential,config)
        data && message.success({content:data.msg,key,duration:3})
        dispatch(fetchAllCredential(id))
    }    
    catch(error){
        dispatch(getCredentialFailure())

    }
};

export default credentialSlice.reducer;