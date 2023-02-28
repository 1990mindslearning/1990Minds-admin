import { DatePicker, Form ,Input,Button} from "antd"
import { useEffect } from "react";
import styled from 'styled-components'
import {useDispatch, useSelector} from 'react-redux'
import { fetchAllLeave,fetchEmployeeLeave, createLeave } from "../../../api/leaveRequest";
import { authenticateSelector } from '../../../api/authSlice';
import io from 'socket.io-client'


const layout = {
      labelCol: { span: 12 },
      wrapperCol: { span: 11 },
    };

const ENDPOINT = "http://localhost:5000"
let socket = io(ENDPOINT)
 
export default function CreateLeaveRequest(){
    const dispatch = useDispatch();
    const {  role,user} = useSelector(authenticateSelector)
    const [form] = Form.useForm();

    // useEffect(()=>{

    //     dispatch(fetchEmployeeLeave(user?._id),role)
    // },[dispatch])
 
    const onFinish = (values) =>{
        console.log(values)
        const data = {
            division:values.division,
            nature_of_leave:values.nature_of_leave,
            date_from:values.date_from,
            date_to:values.date_to,
            reason:values.reason,
            employee:user?._id,     
        }
        dispatch(createLeave(data))
        console.log("Leave request Succesfully Sent",data)
    }

    return(
       
  
         <div className="">    
         {
            role == 'employee'?

      
            <Form onFinish = {onFinish}
                            {...layout}
                        form={form}>
                <Form.Item
                      label = "Division"
                      name="division"
                      rules={[{ required: true, message: 'Please input Division' }]}
                      >
                <Input/>
                </Form.Item>
                <Form.Item
                      label = "Nature of Leave"
                      name="nature_of_leave"
                      rules={[{ required: true, message: 'Please input Nature of Leave' }]}
                      >
                <Input/>
                </Form.Item>
                <h4>Date</h4>
                <Form.Item
                      label = "From"
                      name="date_from"
                      rules={[{ required: true, message: 'Please input Leave Start Date' }]}
                      >
                <DatePicker picker="date"/>
                </Form.Item>
                <Form.Item
                      label = "To"
                      name="date_to"
                      rules={[{ required: true, message: 'Please input Leave End date' }]}
                      >
                <DatePicker picker="date"/>
                </Form.Item>
                <Form.Item
                      label = "Reason"
                      name="reason"
                      rules={[{ required: true, message: 'Please input Reason' }]}
                      >
                <Input/>
                </Form.Item>
                <Form.Item wrapperCol={{ span: 20, offset: 9}}>
                <Button type="primary" htmlType='submit'>Send Request</Button>
                </Form.Item>
            </Form>
        :""} 
         </div>
         
    )
}

 