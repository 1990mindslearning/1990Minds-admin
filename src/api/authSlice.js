import {createSlice} from '@reduxjs/toolkit'
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'


const token =  localStorage.getItem('token') ?
localStorage.getItem('token') : null

const user =  localStorage.getItem('userinfo') ?
 JSON.parse(localStorage.getItem('userinfo'))  : null

export const initialState = {

    loading:false,
    hasErrors:false,
   isAuthenticate:  token? true : false,
   user:user,
   role:null,
   token:token,
   current:[],
   filter:[],
 


}

export const authenticateSlice = createSlice({


    name:"auth",
    initialState,
    reducers:{

      getlogin:state =>{

        state.loading = true;
      },

      getAuthenticate: (state, {payload}) =>{
        console.log(payload)
        state.loading = false;
         state.isAuthenticate = true 
         state.user = payload.user
         state.role = payload.role
         state.token = payload.token

      },
      getFilter: (state, {payload}) =>{

        state.loading = false;
        state.current = payload
  
      },
    
      isAuthenticateError: state =>{

        state.hasErrors = true;
        state.loading = false;
        state.isAuthenticate = false


      },
      getUserProfile: (state, {payload})=>{
        console.log({aaa:payload});

        state.loading = false;
        state.user = payload.user;
        state.role = payload.role
        state.isAuthenticate = true;

      } ,
      getFilter: (state, {payload}) =>{

        state.loading = false;
        state.filter = payload
  
      },



    }


})


export const {getlogin, getFilter, getUserProfile, getAuthenticate, isAuthenticateError }  = 
authenticateSlice.actions

export const authenticateSelector = state => state.auth
export default authenticateSlice.reducer


 

export const logOut = () => async dispatch =>{
    // const key = 'logOut';

    try {
               
        localStorage.removeItem('token');
        window.location.reload();

    } catch (error) {

        dispatch(isAuthenticateError())

    }

}


export const fetchlogin = (logindata) => async dispatch =>{
  console.log(logindata);
 
    const key = 'login';
    dispatch(getlogin())
    message.loading({ content: 'loading...', key })

    try {
        
     
        const {data} = await axios.post(keyUri.BACKEND_URI + '/adminAuth', logindata, config)
        dispatch(getAuthenticate(data))

        localStorage.setItem('token', data.token )
        data &&  message.success({ content: data.msg, key, duration: 2 });

    } catch (error) {
      error && message.error({ content: error.response.data.msg, key, duration: 2 });
       dispatch(isAuthenticateError())
    }

}


export const fetchAdminProfile = (token) => async dispatch =>{

  const loginConfig  = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  dispatch(getlogin())
 


  try {

    const {data} = await axios.get(keyUri.BACKEND_URI + '/adminProfile',  loginConfig)

    dispatch(getUserProfile(data))

  } catch (error) {

 
          error && message.error('Authentication Failure');
          dispatch(logOut())


  }
}

// this is now an action createor which returns a function
export const fethFilter = (value, filter) => async dispatch =>{
  let a = []
console.log(value);
if(!value ){
 return dispatch(getFilter(a)) 
//  action creator returns action now it is dispatch()

}

  try {
      // now using the axios we make request using the URL
      // and dispatcheds the action
      const {data} = await axios.get(keyUri.BACKEND_URI + `/${value}?search=${filter}`, config)
      dispatch(getFilter(data))


  } catch (error) {

      dispatch(isAuthenticateError())
  }

}