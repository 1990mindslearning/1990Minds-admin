import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'


const initialState = {

    all_admin:[],
    loading:false,
    hasError:false,
    current_admin:[],
}


export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {

    getadmin: state => {
      state.loading = true;
    },

    getAll_admin_success: (state, {payload})  =>{

        state.loading = false
        state.all_admin = payload

    },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_admin = payload.admin
    
    },

    get_admin_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getadmin ,getAll_admin_success, getCurrentSuccess, get_admin_Failure } = adminSlice.actions;



export const adminSelector = state => state.admins;



export const fetchAllAdmin = (id) => async dispatch => {
  dispatch(getadmin())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/all-admin/${id}`)
   console.log(data);
   
   dispatch(getAll_admin_success(data));
    
  } catch (error) {
 
 dispatch(get_admin_Failure())

  }
 };


  

 export const deleteAdmin = (id) => async dispatch => {

  dispatch(getadmin())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/admin/${id}`)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllAdmin());
    
  } catch (error) {


 dispatch(get_admin_Failure())
 
  }
 };

 export const createAdmin = (id, values) => async dispatch => {

  dispatch(getadmin())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/admin/${id}`, values, config)

   data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllAdmin(id));
    window.location.reload()

  } 
  catch ({response}) {
response.data && message.error({ content: response.data.msg, key, duration: 2 })
 dispatch(get_admin_Failure())

  }
 };



 export const fetchOneAdmin = (id) => async dispatch => {

  dispatch(getadmin())
 console.log(id);
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/admin/${id}`)
  console.log(data);
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_admin_Failure())
  }
 };


 export const  updateAdminProfile = (id, values) => async dispatch =>{
  const key = "admin"
  dispatch(getadmin())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/admin/${id}`, values, config);
    console.log(data);
    
    data && message.success({ content: data.msg, key, duration: 2 });
    // dispatch(fetchAllAdmin())
    window.location.reload()

} catch ({response}) {
console.log(response.data);
    dispatch(get_admin_Failure())
    // response.data && message.success({ content: response.data.msg, key, duration: 2 });

}
}


export const updateNotify = (id,values) => async dispatch =>{
  console.log("The values are :",values)
     const key = "notification"
     dispatch(getadmin())
    //  message.loading({content:`Loading ${key}`})
     try{
      const {data} = await axios.put(keyUri.BACKEND_URI+`/updateNotification/${id}`,values,config)
      console.log(data)
      
      data && message.success({ content: data.msg, key, duration: 2 });
      // dispatch(fetchAllAdmin());
      
      window.location.reload()


     }
     catch(error){
      console.log(error)
     }
}

// export const deleteManyAdministration = (values,id) => async dispatch =>{

//   console.log(values);
//   const key = 'delete';
//   dispatch(getadministration())
//   message.loading({ content: 'loading...', key })

//   try {
      
//       const {data} = await axios.post({ keyUri, config }.BACKEND_URI + `/delete-many`, values, config )
  
//       data &&  message.success({ content: data.msg, key, duration: 2 });

//       dispatch(fetchAllAdministration(id))

//   } catch (error) {

// dispatch(get_administration_Failure())
// setTimeout(() => {

//   message.error({ content: error.response.data.msg, key, duration: 2 });
// }, 100) 
    
//   }

// }
 

export default adminSlice.reducer;
