import React, {useEffect} from 'react'
// import imge from '../../images/login.jpg'
// import loginimage from '../../images/loginlogo.png'
import banner from '../../images/menuIcons/office1990.png'
import logo from '../../images/office6.png'



import {Form, Input,Button} from 'antd'
import {FaUserAlt, FaLock} from 'react-icons/fa'
import {fetchlogin, authenticateSelector} from '../../api/authSlice'
import { fetchemplogin } from '../../api/employee'

import {useDispatch, useSelector} from 'react-redux'
import styled from 'styled-components'
 
import { useState } from 'react';
 

const tailLayout = {
    wrapperCol: {
      offset: 12,
      span: 8,
    },
  };



export default function Login({history}) {

const {  user} = useSelector(authenticateSelector)

const dispatch = useDispatch()
const { isAuthenticate } = useSelector(authenticateSelector)

    const onFinish = (values) => {
        console.log('Success:', values);
        // console.log("history is:",history)
        dispatch(fetchlogin(values))

      };
      useEffect(()=>{

        
          if(isAuthenticate) {

  // history.push('/dashboard/home')
  window.location.href = '/dashboard/home'

          } else {
                history.push('/')
              }

}, [isAuthenticate])
      

      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };


      const forgotPass = ()=>{
        return alert('forgot password')
      }

    return (
        <LoginWrap className=' bg-black'>
 

<div className='flex'>
{/* <img src={banner} alt="employee" className="block mx-auto" width="58%" height="100vh"/> */}
<img class="img2" src={banner} style={{height:'100vh'}}/>

{/* <h1 className="font-Samarkan title  font-normal text-4xl  m-24 text-white">Login</h1> */}


<div className=' box '>
 



<Form
      className='form '
      name="basic"
      initialValues={{ remember: true }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <img class="img1" src={logo} width="100px"/>
 
       
      <Form.Item 
        
        name="email"       
        rules={[{ required: true, message: 'Please input your username!' }]}
      >
        <Input prefix={<FaUserAlt className=" text-xl mr-3"/>} placeholder="Enter username" />
      </Form.Item>

 
      <Form.Item   
        name="password"
        rules={[{ required: true, message: 'Please input your password!' }]}
      >
        <Input.Password  prefix={<FaLock className=" text-xl mr-3 mb-0"/>} placeholder="Enter password"/>
      </Form.Item>

      <p onClick={forgotPass} className="mt-0 py-0">Forgot password ?</p>

      <Form.Item {...tailLayout} >
      <Button class="submit" style={{boxShadow:"0px 2px 7px 0px yellow", fontWeight:"400", borderRadius:"5px", fontSize:"1.2rem", padding:"0 2rem" ,backgroundColor:'#45f3ff',color:'black',}} type="primary" htmlType="submit">
        Login
        </Button>
      </Form.Item>
    </Form>
</div>
</div>
 
 
           
        </LoginWrap>
    )
}


const LoginWrap = styled.div`
  .ant-input-affix-wrapper > input.ant-input {
      background-color: #ffffff !important; 
  }

  
  .ant-input-affix-wrapper:focus, .ant-input-affix-wrapper-focused {
      background-color: #ffffff !important;
      box-shadow:none !important;
      border-bottom:2px solid grey !important;
      transition:0.3s ease-in-out;
      
  }

  p{
    font-size: 0.8rem ;
    color: white;
    float: right;
    cursor: pointer;
    
  } 

`