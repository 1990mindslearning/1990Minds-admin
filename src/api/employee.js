import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'


const token =  localStorage.getItem('token') ?
localStorage.getItem('token') : null

const user =  localStorage.getItem('userinfo') ?
 JSON.parse(localStorage.getItem('userinfo'))  : null


const initialState = {
    user:user,
    role:null,
    loading:false,
    token:null,

    employee:false,
    login:false,
    personal:false,
    education:false,
    experience:false,
    bank:false,
    salary:false,
    activeTab:"1",


    employee_data:[],
    login_data:null,
    personal_data:null,
    education_data:null,
    experience_data:null,
    bank_data:null,
    salary_data:null,


    all_employee:[],
    current_employee:[],
    
}


export const employeeSlice = createSlice({
  name: 'employee',
  initialState,
  reducers: {

    getemployee: state => {
      state.loading = true
      state.employee = true
      state.activeTab = "1"
    },

    getemployeeactive: state =>{
      state.loading = true

    },

    getlogin: state=>{
      state.loading = true
      state.employee = true
      state.login = true
      state.activeTab = "2"
    },

    getpersonal: state =>{
      state.loading = true
      state.employee = true
      state.login = true
      state.personal = true
      state.activeTab = "3"
    },

    geteducation: state =>{
      state.loading = true
      state.employee = true
      state.login = true
      state.personal = true
      state.education = true
      state.activeTab = "4"
    },

    getexperience: state =>{
      state.loading = true
      state.employee = true
      state.login = true
      state.personal = true
      state.education = true
      state.experience = true
      state.activeTab = "5"
    },

    getbank: state=>{
      state.loading = true
      state.employee = true
      state.login = true
      state.personal = true
      state.education = true
      state.experience = true
      state.bank = true
      state.activeTab = "6"
    },

    getsalary: state =>{
      state.loading = true
      state.employee = true
      state.login = true
      state.personal = true
      state.education = true
      state.experience = true
      state.bank = true
      state.salary = true
      state.activeTab = "7"
    },

    getFinish:state=>{
      state.loading = true
      state.employee = true
      state.login= false
      state.personal = false
      state.education = false
      state.experience = false
      state.bank = false
      state.salary = false
      state.activeTab = "1"

    },

    employeeInfo:(state,{payload}) =>{
      state.loading = true
      state.employee_data = payload
    },

    loginInfo:(state,{payload}) =>{
      state.loading = true
      state.login_data = payload
    },

    personalInfo:(state,{payload}) =>{
      state.loading = true
      state.personal_data = payload
    },

    educationInfo:(state,{payload}) =>{
      console.log(payload)
      state.loading = true
      state.education_data = payload
    },

    experienceInfo:(state,{payload}) =>{
      state.loading = true
      state.experience_data = payload
    },

    bankInfo:(state,{payload})=>{
      state.loading = true
      state.bank_data = payload
    },
    salaryInfo:(state,{payload})=>{
      state.loading = true
      state.salary_data = payload
    },

    getAll_employee_success: (state, {payload})  =>{

      state.loading = false
      state.all_employee = payload.employee

  },
  get_employee_Failure: (state) => {

    state.loading = false
    state.hasError = true
  },
  
  getCurrentSuccess: (state, {payload}) =>{
    state.loading = false
    state.current_employee = payload.employee

},

    getAuthenticate: (state, {payload}) =>{
      console.log(payload)
       state.loading = false;
       state.isAuthenticate = true 
       state.user = payload.employee
       state.role = payload.role
       state.token = payload.token

    },
    isAuthenticateError: state =>{

      state.hasErrors = true;
      state.loading = false;
      state.isAuthenticate = false


    },
    getUserProfile: (state, {payload})=>{

      state.loading = false;
      state.user = payload;
      state.role=payload.role
      state.isAuthenticate = true;

    },

  },
})


export const {getemployee,getlogin,getpersonal,geteducation,getexperience,getbank,getsalary,getFinish,getAuthenticate,isAuthenticateError,getUserProfile,
  employeeInfo,loginInfo,personalInfo,experienceInfo,educationInfo,bankInfo,salaryInfo,getAll_employee_success,get_employee_Failure,getCurrentSuccess,getemployeeactive} = 
employeeSlice.actions;



export const employeeSelector = state => state.employee;

export const getEmployeeInfo = (info) => async dispatch =>{
    try {
        dispatch(employeeInfo(info))       
    } catch (error) {       
        console.log(error);
    }
}
export const Createemployee =()=> async dispatch =>{
  try{
    dispatch(getemployee())
  }
  catch(error){
    console.log(error)
  }
}

export const getLoginInfo = (info) => async dispatch =>{
  try {
      dispatch(loginInfo(info))       
  } catch (error) {       
      console.log(error);
  }
}

export const Createlogin =() =>async dispatch =>{
  try{
    dispatch(getlogin())
  }
  catch(error){
    console.log(error)
  }
}
export const getPersonalInfo = (info) => async dispatch =>{
  try {
      dispatch(personalInfo(info))       
  } catch (error) {       
      console.log(error);
  }
}

export const Createpersonal = () => async dispatch =>{
  try{
    dispatch(getpersonal())
  }
  catch(error){
    console.log(error)
  }
}

export const getEducationInfo = (info) => async dispatch =>{
  try {
      dispatch(educationInfo(info))       
  } catch (error) {       
      console.log(error);
  }
}


export const Createeducation = () => async dispatch =>{
  try{
    dispatch(geteducation())
  }
  catch(error){
    console.log(error)
  }
}


export const getExperienceInfo = (info) => async dispatch =>{
  try {
      dispatch(experienceInfo(info))       
  } catch (error) {       
      console.log(error);
  }
}

export const Createexperience = () =>async dispatch =>{
  try{
    dispatch(getexperience())
  }
  catch(error){
    console.log(error)
  }
}

export const getBankInfo = (info) => async dispatch =>{
  try {
      dispatch(bankInfo(info))       
  } catch (error) {       
      console.log(error);
  }
}
export const Createbank = () => async dispatch =>{
  try{
    dispatch(getbank())
  }
  catch(error){
    console.log(error)
  }
}

export const getSalaryInfo = (info) => async dispatch =>{
  try {
      dispatch(salaryInfo(info))       
  } catch (error) {       
      console.log(error);
  }
}

export const Createsalary = () => async dispatch =>{
  try{
    dispatch(getsalary())
  }
  catch(error){
    console.log(error)
  }
}

export const CreateFinish = () => async dispatch =>{
  try{
    dispatch(getFinish())
  }
  catch(error){
    console.log(error)
  }
}





export const fetchAllEmployee = (id) => async dispatch => {

  dispatch(getemployeeactive())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/employee`)
   console.log({employee:data});
   
   dispatch(getAll_employee_success(data));


    
  } catch (error) {
 
 dispatch(get_employee_Failure())

  }
 };


  

 export const deleteEmployee = (id, employee) => async dispatch => {

  dispatch(getemployeeactive())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/employee/${id} `, employee, config)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllEmployee());
    
  } catch (error) {


 dispatch(get_employee_Failure())
 
  }
 };




 export const logOut = () => async dispatch =>{
  const key = 'logOut';

  try {
             
      localStorage.removeItem('token');
      window.location.reload();

  } catch (error) {

      dispatch(isAuthenticateError())

  }

}

 export const createemployee = ( values) => async dispatch => {
  console.log(values)

  dispatch(getemployeeactive())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/employee`, values, config)

   data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllEmployee());
    window.location.reload()

  } 
  catch ({response}) {
response.data && message.error({ content: response.data.msg, key, duration: 2 })
 dispatch(get_employee_Failure())

  }
 };



 export const fetchOneEmployee = (id) => async dispatch => {
  

  dispatch(getemployeeactive())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/employee/${id}`)
  console.log('THE EMPLOYEE',data);
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_employee_Failure())
  }
 };


 export const  updateEmployee = (id, values) => async dispatch =>{
    const key = "employee"
  dispatch(getemployeeactive())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/employee/${id}`, values, config);
    console.log(data);
    
    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAllEmployee())
    window.location.reload()
    
} catch ({response}) {
console.log(response.data);
    dispatch(get_employee_Failure())
   

}
}

export const deleteManyEmployee = (values) => async dispatch =>{

  console.log(values);
  const key = 'delete';
  dispatch(getemployee())
  message.loading({ content: 'loading...', key })

  try {
      
      const {data} = await axios.post(keyUri + `/delete-employee`, values, config )
  
      data &&  message.success({ content: data.msg, key, duration: 2 });

      dispatch(fetchAllEmployee())

  } catch (error) {

dispatch(get_employee_Failure())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}
export const fetchemplogin = (logindata) => async dispatch =>{
  const key = 'login';
  dispatch(getlogin())
  message.loading({ content: 'loading...', key })

  try {
      
   
      const {data} = await axios.post(keyUri.BACKEND_URI + '/empAuth', logindata, config)
     

      dispatch(getAuthenticate(data))

      localStorage.setItem('token', data.token )
      data &&  message.success({ content: data.msg, key, duration: 2 });

  } catch (error) {
    error && message.error({ content: error.response.data.msg, key, duration: 2 });
     dispatch(isAuthenticateError())
  }

}


export const empProfile = (token) => async dispatch =>{

const loginConfig  = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
}

dispatch(getlogin())



try {

  const {data} = await axios.get(keyUri.BACKEND_URI + '/empProfile',  loginConfig)

  dispatch(getUserProfile(data))

} catch (error) {


        error && message.error('Authentication Failure');
        dispatch(logOut())


}
}




export default employeeSlice.reducer;
