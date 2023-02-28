import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
import { Form, Input, Button, DatePicker, Select, Upload, InputNumber, Switch  } from 'antd';
import {createpayslip, fetchAllPayslip} from '../../../api/payslip'
import { UploadOutlined } from '@ant-design/icons';
import moment from 'moment';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import {authenticateSelector} from '../../../api/authSlice';
import { fetchAllEmployee,employeeSelector } from '../../../api/employee';
import { log } from '@craco/craco/lib/logger';

const { Option } = Select;

const layout = {
    labelCol: { span: 12 },
    wrapperCol: { span: 11 },
  };
  
  
export default function Createpayslip({cancel}) {
  
    const [loading, setLoading] = useState(false)
    const { payslip_id } = useSelector(authenticateSelector) 
    const { all_employee} = useSelector(employeeSelector) 
    const [form] = Form.useForm();
  
      const dispatch = useDispatch();
      console.log({K:all_employee});
      
      useEffect(()=>{

        dispatch(fetchAllEmployee())
        dispatch(fetchAllPayslip())
           
           
            }, [dispatch])
        
  
  const onFinish = (values) => {
  console.log(values);
      const data = {
         employee:values.employee,
         month:moment(values.month).format(),
         no_of_working_days:values.no_of_working_days,
         deductions_LOP:values.deductions_LOP,
         deductions_WFH:values.deductions_WFH,
        
         
      }
      console.log(data);

   dispatch(createpayslip(data))
   form.resetFields()
  //  cancel()
  
  };
  

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };


  const handleChangeSelect = (value) =>{

    // console.log(value);
    setLoading(value)

}
const onPayslipChange = (value) => {
    switch (value) {
      case 'Devlopment':
        form.setFieldsValue({ note: 'Hi, devloper!' });
        return;
      case 'Designer':
        form.setFieldsValue({ note: 'Hi, designer!' });
        return;
      case 'other':
        form.setFieldsValue({ note: 'Hi there!' });
    }
  };
  
  
  
      return (
          <CreatePayslipWrap className="container ">
  
               <Form

        {...layout}
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
  
  <div className="grid gap-5">
<div>   

<Form.Item
          label="Employee Name "
          name="employee"
          rules={[{ required: true, message: 'Please select employee name!' }]}
        >
<Select

 placeholder="Select Employee"
  onChange={handleChangeSelect}
  filterOption={(input, option) =>
    option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
  }
>
    {
    all_employee.map((item)=>{  
  
        return <option  key={item._id} value={item._id} >{item.personal?.full_name}</option>
    })
    }
</Select>
</Form.Item>

<Form.Item
       label="month"
       name='month'

       rules={[{ required: true, message: 'Please input month!' }]}>

<DatePicker picker="month" />
        
    
          </Form.Item>

          <Form.Item
          label="Number of Working Days"
          name="no_of_working_days"
          rules={[{ required: true, message: 'Please input no of working days!' }]}
        >
  
        <InputNumber placeholder='Number of Working Days in the month'/>
        </Form.Item>
        <Form.Item
          label=" Deductions LOP"
          name="deductions_LOP"
          rules={[{ required: true, message: 'Please input deductions_LOP!' }]}
        >
  
  <InputNumber placeholder='Number of leaves taken in the month'/>
        </Form.Item>

        <Form.Item
          label=" Deductions WFH"
          name="deductions_WFH"
          rules={[{ required: true, message: 'Please input deductions_WFH!' }]}
        >
  
          <InputNumber placeholder='Number of WFH taken'/>
        </Form.Item>


      


        
   
 </div><div>            


      
 
        </div>
        </div>

  <Form.Item wrapperCol={{ span: 20, offset: 9}}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      
      </Form>
  
  
          </CreatePayslipWrap>
      )
  }
  
  
  const CreatePayslipWrap = styled.div`
  
  
  
  `