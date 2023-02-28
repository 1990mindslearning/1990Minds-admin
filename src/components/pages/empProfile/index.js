import React,{useEffect, useState} from 'react'
import { Table, Tag, Space,Button,Form,Input } from 'antd';
import { FaRegTrashAlt,FaCheckCircle} from 'react-icons/fa';
import DeleteConfirm from '../../shared/deleteConfirm'
import {useDispatch,useSelector} from 'react-redux'
import profile from '../../../images/profile.jpg'
import moment from 'moment';
import { authenticateSelector } from '../../../api/authSlice';
import { fetchEmployeepayslip,payslipSelector } from '../../../api/payslip';
import PayslipTable from '../payslip/datatable';

 

 


 
export default function Home(){ 
  
  const dispatch = useDispatch();
  const {  user} = useSelector(authenticateSelector)
  const {role } = useSelector(authenticateSelector)
 
 
 
 
  
   

  let date = moment(user.employee?.doj).format('DD-MM-YYYY')
 
 
  
 
 
 

return(
  <div>
    <div className='profile'>
    
    <img src={profile} alt="profile-pic"/>
   
  
     
      {role == 'employee'?
        <div className=' ml-6'><Form.Item
          label="Name"><h1>{ user.personal?.full_name}</h1>
      </Form.Item> 
      <Form.Item
          label="Employee ID">{<h1>{user.employee?.emp_id}</h1>}
      </Form.Item>
      <Form.Item
          label="Date of Joining">{<h1>{date}</h1>}
      </Form.Item>

      <Form.Item
          label="Designation">{<h1>{user.employee?.designation}</h1>}
      </Form.Item>

      <Form.Item
          label="Contact Number">{<h1>{user.employee?.phone_number}</h1>}
      </Form.Item>
      </div> :
      <div className=' ml-6'>
      <Form.Item
          label="Name"><h1>{user.name}</h1>
      </Form.Item> 
      <Form.Item
          label="Email"><h1>{user.email}</h1>
      </Form.Item> 
      <Form.Item
          label="Phone Number"><h1>{user.phone_no}</h1>
      </Form.Item> 

      </div>}
    
</div>
</div>
 

      
)
}
