import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios'
import { message } from 'antd';
import { keyUri, config } from '../key'
import {saveAs} from 'file-saver' 

const initialState = {

    all_payslip:[],
    loading:false,
    hasError:false,
    current_payslip:null,
}


export const payslipSlice = createSlice({
  name: 'payslip',
  initialState,
  reducers: {

    getpayslip: state => {
      state.loading = true;
    },

    getAll_payslip_success: (state, {payload})  =>{

        state.loading = false
        console.log(payload)
        state.all_payslip = payload.payslip

    },


    getCurrentSuccess: (state, {payload}) =>{
        state.loading = false
        state.current_payslip = payload. payslip
    
    },

    get_payslip_Failure: (state) => {

      state.loading = false
      state.hasError = true
    },

  },
})


export const { getpayslip ,getAll_payslip_success, getCurrentSuccess, get_payslip_Failure } = payslipSlice.actions;



export const payslipSelector = state => state.payslip;



export const fetchAllPayslip = () => async dispatch => {
  dispatch(getpayslip())
 
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/payslip`)
   console.log(data);
   
   dispatch(getAll_payslip_success(data));
    
  } catch (error) {
 
 dispatch(get_payslip_Failure())

  }
 };


  

 export const deletePayslip = (id, payslip) => async dispatch => {

  dispatch(getpayslip())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.delete(keyUri.BACKEND_URI +`/payslip/${id} `, payslip, config)
  data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllPayslip());
    
  } catch (error) {


 dispatch(get_payslip_Failure())
 
  }
 };





 export const createpayslip = (value) => async dispatch => {
   console.log(value);

  dispatch(getpayslip())
  const key = 'create';
  message.loading({ content: 'loading...', key })
  try {
 
   const {data} = await axios.post(keyUri.BACKEND_URI +`/payslip`, value,config)

   data && message.success({ content: data.msg, key, duration: 2 });
   dispatch(fetchAllPayslip());
    window.location.reload()

  } 
  catch ({response}) {
response.data && message.error({ content: response.data.msg, key, duration: 2 })
 dispatch(get_payslip_Failure())

  }
 };

 export const fetchOnepayslip = (id) => async dispatch => {

  dispatch(getpayslip())
 console.log(id);
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/payslip/${id}`)
  console.log(data);
   dispatch(getCurrentSuccess(data));
  } catch (error) {

 dispatch(get_payslip_Failure())
  }
 };

 
 export const fetchEmployeepayslip = (id,role) => async dispatch => {

  dispatch(getpayslip())
 console.log(id);
  try {
 
   const {data} = await axios.get(keyUri.BACKEND_URI +`/payslip-employee/${id}?role=${role}`)
  console.log(data);
   dispatch(getAll_payslip_success(data));
  } catch (error) {

 dispatch(get_payslip_Failure())
  }
 };

 export const  updatePayslip = (id, values) => async dispatch =>{
  const key = "payslip"
  dispatch(getpayslip())
  message.loading({ content: 'loading...', key })

try {
    const {data} = await axios.put(keyUri.BACKEND_URI +`/payslip/${id}`, values, config);
    data && message.success({ content: data.msg, key, duration: 2 });
    dispatch(fetchAllPayslip())
    window.location.reload()

} catch ({response}) {
console.log(response.data);
    dispatch(get_payslip_Failure())
   

}
}

export const deleteManyPayslip = (values) => async dispatch =>{

  console.log(values);
  const key = 'delete';
  dispatch(getpayslip())
  message.loading({ content: 'loading...', key })

  try {
      
      const {data} = await axios.post(keyUri + `/delete-payslip`, values, config )
  
      data &&  message.success({ content: data.msg, key, duration: 2 });

      dispatch(fetchAllPayslip())

  } catch (error) {

dispatch(get_payslip_Failure())
setTimeout(() => {

  message.error({ content: error.response.data.msg, key, duration: 2 });
}, 100) 

      
  }

}
export const createPayslipPdf = (pdfValues) => async dispatch => {
  console.log(pdfValues);

  axios.post(keyUri.BACKEND_URI + `/create-pdf`, pdfValues, config )
  .then(() => axios.get(keyUri.BACKEND_URI +'/fetch-templetpdf', { responseType: 'blob' })) 
  .then((res) => {  
      console.log(res.data);      
      const pdfBlob = new Blob([res.data], 
          { type: 'application/pdf' });
   saveAs(pdfBlob, 'payslip.pdf');      
}   
)
}

export default payslipSlice.reducer;
