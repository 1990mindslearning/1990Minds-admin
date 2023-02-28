import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux' 
import ModalForm from '../../shared/modal'
import Loader from '../../shared/loader'
import {PlusOutlined, SearchOutlined} from '@ant-design/icons';
import TodolistTable from './showtodo';
import { Form, Input, Button, DatePicker, Upload, InputNumber, Switch  } from 'antd';
import CreateTodoList from './createtodolist';
import {fetchAllTodo,todolistSelector} from '../../../api/todolist'
import {authenticateSelector} from '../../../api/authSlice'
import styled from 'styled-components'

export default function Home(){
  const dispatch = useDispatch()
  const {  user} = useSelector(authenticateSelector)
  const { loading ,all_todo} = useSelector(todolistSelector) 
  const [todolistAddVisible, SetTodolistAddVisible] = useState(false)
  
  
  // useEffect(()=>{

  //   // dispatch(fetchAllEmployee())
  //   dispatch(fetchAllTodo(user?._id))
  
       
       
  //       }, [user])

  
    return(
        <div className='todo'>
        {/* <Button onClick={()=>SetTodolistAddVisible(true)} type="primary" icon={<PlusOutlined />}>Create Todo</Button> */}
        <h1>Enter your Tasks here..</h1>
        <CreateTodoList/>
          {
            loading ? <Loader/> :  <TodolistTable data={all_todo}/>
          }
    
                 

                 
            

        </div>
)}
 

