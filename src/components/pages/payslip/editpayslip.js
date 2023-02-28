import React,  {useEffect, useState} from 'react'
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import {useParams} from 'react-router-dom'
import { Form, Input, Button, DatePicker, Upload, InputNumber, Switch  } from 'antd';
import {updatePayslip, fetchOnePayslip, payslipSelector,} from '../../../api/payslip'
import { UploadOutlined } from '@ant-design/icons';
import {authenticateSelector} from '../../../api/authSlice'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import moment from 'moment';


const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 10 },
  };
  
export default function EditPayslip({current_payslip}) {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false)
    
    // const {current_payslip} = useSelector(payslipSelector)
    
 
    const dispatch = useDispatch()
    
    const {id} = useParams()
    useEffect(()=>{
      console.log("Currebt payslip values is:",current_payslip?.personal?.full_name)
 
  
    form.setFieldsValue({
        employee:current_payslip.employee &&  current_payslip.employee?.personal?.full_name,
        deductions_LOP:current_payslip && current_payslip?.deductions_LOP,
        deductions_WFH:current_payslip && current_payslip.deductions_WFH,
        Net_Salary:current_payslip && current_payslip.Net_Salary,
        month:current_payslip && moment(current_payslip?.month)
      



        // DOJ:current_employee && moment(current_employee.DOJ).format('DD/MM/YYYY'),

        
        });

        

  }, [current_payslip])


  const onFinish = (values) => {
    console.log(current_payslip.employee?.salary?.professional_tax);
        const payslipdata = {
           Net_Salary:(current_payslip.employee?.salary?.gross_salary -  current_payslip.employee?.salary?.professional_tax - values.deductions_LOP -  values.deductions_WFH),
           month:moment(values.month),
           deductions_LOP:values.deductions_LOP,
           deductions_WFH:values.deductions_WFH,
          //  employee:values.employee_name
           
        }
           
    console.log('payslip wupadted data is',payslipdata)        
   dispatch(updatePayslip(current_payslip._id, payslipdata))
  //  form.resetFields()
           
           };
        

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  
  return (
    <EditPayslipWrap className="container ">

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
          label="Employee"
          name="employee"
          rules={[{ required: true, message: 'Please input payslip Employee!' }]}
        >
  
          <Input style={{ width: '250px' }} />
        </Form.Item>

        <Form.Item
       label="month"
       name='month'

       rules={[{ required: true, message: 'Please input month!' }]}>

<DatePicker picker='month' />
        
    
          </Form.Item>



        <Form.Item
          label="Deductions LOP"
          name="deductions_LOP"
          rules={[{ required: true, message: 'Please input deductions_LOP!' }]}
        >
  
          <InputNumber />
        </Form.Item>

        <Form.Item
          label="Deductions WFH"
          name="deductions_WFH"
          rules={[{ required: true, message: 'Please input deductions_WFH!' }]}
        >
  
          <InputNumber />
        </Form.Item>


        

        <Form.Item
        
          label="Net_Salary"
            name="Net_Salary">
          
            <InputNumber disabled/>
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


    </EditPayslipWrap>
)
}


const EditPayslipWrap = styled.div`



`