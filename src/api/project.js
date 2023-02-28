import {createSlice} from "@reduxjs/toolkit";
import axios from 'axios';
import {message} from 'antd';
import { keyUri,config } from '../key';

const initialState = {
    loading:false,

    project:false,
    projectform:false,
    attachments:false,
    activeTab:"1",

    project_data:[],
    project_form_data:null,
    attachments_data:null,

    all_projects:[],
    current_project:[],
}

export const projectSlice = createSlice({
    name:'project',
    initialState,
    reducers:{
        getproject:state =>{
            state.loading = true
            state.project = true
            state.activeTab = "1"
        },
        getprojectForm: state =>{
            state.loading = true
            state.project = false
            state.projectform = true
            state.activeTab = "2"
            console.log("Hello",state.activeTab)

        },
        getattachments: state =>{
            state.loading = true
            state.project = true
            state.projectform = true
            state.attachments = true
            state.activeTab = "3"
        },

        projectInfo:(state,{payload}) =>{
            console.log(payload)
            state.loading = true
            state.project_data = payload
            console.log(state.project_data)
        },
        projectFormInfo:(state,{payload}) =>{
            state.loading = true
            state.project_form_data = payload
        },
        attachmentsInfo:(state,{payload})=>{
            state.loading = true
            state.attachments_data = payload
        },

        getAll_Project_Success:(state,{payload})=>{
            state.loading = false
            state.all_projects = payload.project
            console.log(payload)
        },
        get_project_failure:(state)=>{
            state.loading = false
            state.hasError = true
        },
        getCurrentSuccess:(state,{payload})=>{
            state.loading = false
            state.current_project = payload.project
        },


    },
})


export const {getproject,getprojectForm,getattachments,projectFormInfo,projectInfo,attachmentsInfo,getAll_Project_Success,get_project_failure,getCurrentSuccess} = 
projectSlice.actions;


export const projectSelector = state => state.project;

export const getprojectInfo = (info) => async dispatch =>{
    console.log("//////////////////",info)
    try{
        dispatch(projectInfo(info))
    }catch(error){
        console.log(error)
    }
}

export const CreateProject = () => async dispatch =>{
    
    try{
        dispatch(getproject())
    }catch(error){
        console.log(error)
    }
}


export const getProjectFormInfo = (info) => async dispatch =>{
    try{
        dispatch(projectFormInfo(info))
    }catch(error){
        console.log(error)
    }
}

export const CreateProjectForm = () => async dispatch =>{
    console.log("inside the create from")
    try{
        dispatch(getprojectForm())
    } catch(error){
        console.log(error)
    }
}

export const getAttachmentInfo = (info) => async dispatch =>{
    try{
        dispatch(attachmentsInfo(info))
    }catch(error){
        console.log(error)
    }
}

export const CreateAttachments = () => async dispatch =>{
    try{
        dispatch(getattachments())
    } catch(error){
        console.log(error)
    }
}




export const createProject = (value) => async dispatch =>{
    console.log(value)
    dispatch(getproject())
    const key = 'project';
    message.loading({content:'loading....',key})
    try{
        const {data} = await axios.post(keyUri.BACKEND_URI+`/project`,value,config)
        data && message.success({content:data.msg,key,duration:3})
        dispatch(fetchAllProject());
        window.location.reload()
    }
    catch({response}){
        response.data && message.error({content:response.data.msg,key,duration:2})
        dispatch(get_project_failure())
    }
}

export const fetchAllProject = () => async dispatch =>{
    dispatch(getproject())
    try{
        const {data} = await axios.get(keyUri.BACKEND_URI+`/project`)
        console.log(data)
        dispatch(getAll_Project_Success(data))
    }
    catch(error){
        dispatch(get_project_failure())
    }
}

export const fetchOneProject = (id) => async dispatch =>{
    dispatch(getproject())
    try{
        const {data} = await axios.get(keyUri.BACKEND_URI+`/project/${id}`)
        dispatch(getCurrentSuccess(data))
    }catch(error){
        dispatch(get_project_failure())
    }
}


export const updateProject = (id,values) => async dispatch =>{
    const key = 'project'
    dispatch(getproject())
    try{
        const {data} = await axios.put(keyUri.BACKEND_URI+`/project/${id}`,values,config)
        data && message.success({content:data.msg,key,duration:2})
        dispatch(fetchAllProject())
        window.location.reload()
    }catch({response}){
        dispatch(get_project_failure())
    }
}

export const deleteProject = (id,project) => async dispatch =>{
    dispatch(getproject())
    const key  = 'create'
    message.loading({content:'loading.....',key})
    try{
        const {data} = await axios.delete(keyUri.BACKEND_URI+`/project/${id}`,project,config)
        data && message.success({ content: data.msg, key, duration: 2 });
        dispatch(fetchAllProject())
    }
    catch(error){
        dispatch(get_project_failure())
    }
}

export default projectSlice.reducer;


