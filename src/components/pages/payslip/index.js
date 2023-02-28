import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Tabs, Button, Input } from 'antd';
import {PlusOutlined, SearchOutlined} from '@ant-design/icons'
import ModalForm from '../../shared/modal'
import Loader from '../../shared/loader'
import PayslipTable from './datatable'
import Createpayslip from './createpayslip'
import EditPayslip from './editpayslip';
import {fetchAllPayslip,fetchEmployeepayslip,payslipSelector} from '../../../api/payslip'
import {authenticateSelector} from '../../../api/authSlice'
import axios from 'axios'
import {keyUri} from '../../../key'


const { Search } = Input;


export default function Database() {

  const dispatch = useDispatch()
  const { loading ,all_payslip} = useSelector(payslipSelector) 
  const { payslip_id,user,role} = useSelector(authenticateSelector) 
   
 

  const [payslipAddVisible, SetPayslipAddVisible] = useState(false)
  // const [searchvalue, setSearchvalue] = useState('')

console.log(all_payslip);

  useEffect(()=>{

    dispatch(fetchEmployeepayslip(user?._id,role))
  

     }, [dispatch])

    


  const handleCancel = () => {
    SetPayslipAddVisible(false)
  };


  // const onSearch = e => {
  //   const searchvalue = e.target.value
  //   setSearchvalue(searchvalue)

  //   return  axios.get(keyUri.BACKEND_URI + `/all-department/${employee_id}?search=${searchvalue}`).then((data=>{
  //       setDepartments(data.data)
  //       }))

  // }

     return (
      <div>
         

      <div className=" ">
          <div className="my-2">    
           
            { role == 'admin'?
              <Button className='mb-3' onClick={()=>SetPayslipAddVisible(true)} type="primary" icon={<PlusOutlined />}>
            Payslip </Button> :""
            }
            
  {/* <Input
                        placeholder="Search "
                        allowClear
                        enterButton="Search"
                        size="middle"
                        onChange={onSearch}
                        style={{ width: 300 }}
                        prefix={<SearchOutlined />}
                        className="shadow"
                        /> */}
    
                </div>
                    {
                        loading ? <Loader/> :  <PayslipTable data={all_payslip}/>
                    }

                    {
                       role == 'admin'? 
                       <ModalForm 
                    isVisible={payslipAddVisible} 
                    title="CREATE PAYSLIP"
                    footer={false}
                    className=""
                    width="60%"
                    cancel={()=>SetPayslipAddVisible(!payslipAddVisible)}>
                      
                      <Createpayslip cancel={()=>SetPayslipAddVisible(!payslipAddVisible)}/>


                      
                      </ModalForm> :""
                    }
                 









                </div>
     
      </div>
  )
}




