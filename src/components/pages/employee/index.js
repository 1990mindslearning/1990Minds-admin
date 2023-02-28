import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Tabs, Button, Input } from 'antd';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons'
 
import Loader from '../../shared/loader'
import EmployeeTable from './employeetable'
 
import {fetchAllEmployee,employeeSelector} from '../../../api/employee'
import {authenticateSelector} from '../../../api/authSlice'
 
import {Link} from 'react-router-dom'


const { Search } = Input;


export default function Database() {

  const dispatch = useDispatch()
  const { loading ,all_employee} = useSelector(employeeSelector) 
  const { employee_id } = useSelector(authenticateSelector) 
  const [employeeAddVisible, SetEmployeeAddVisible] = useState(false)
  // const [searchvalue, setSearchvalue] = useState('')

console.log(all_employee);

  useEffect(()=>{

      dispatch(fetchAllEmployee())
    
    
     }, [])


  const handleCancel = () => {
    SetEmployeeAddVisible(false)
  };


  // const onSearch = e => {
  //   const searchvalue = e.target.value
  //   setSearchvalue(searchvalue)

  //   return  axios.get(keyUri.BACKEND_URI + `/all-department/${employee_id}?search=${searchvalue}`).then((data=>{
  //       setDepartments(data.data)
  //       }))

  // }

     return (
 
         

      <div className="pt-5 ">
      
           
            <Link to="/dashboard/create-employee"><Button onClick={()=><Link></Link>} type="primary" icon={<PlusOutlined />}>
                    Add Employee </Button></Link>
    
             
                    {
                        loading ? <Loader/> :  <EmployeeTable data={all_employee}/>
                    }
                </div>
     
   
  )
}




