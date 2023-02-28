import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import adminReducer from './admin'
import employeeReducer from './employee'
import payslipreducer from './payslip'
import todolistReducer from './todolist';
import leaveRequestReducer from './leaveRequest'
import clientReducer from './clients'
import credentialReducer from './credential'
import projectReducer from './project'


export default configureStore({
  reducer: {

    auth:authReducer,
     admins:adminReducer,
     employee:employeeReducer,
     payslip:payslipreducer,
     todolist:todolistReducer,
     leave:leaveRequestReducer,
     client:clientReducer,
     credential:credentialReducer,
     project:projectReducer
   
  },
});