import React, {useState,useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import moment from 'moment';
import { fetchAllEmployee,employeeSelector } from '../../../api/employee';
import PayslipTable from '../payslip/datatable';
import Loader from '../../shared/loader'
import { Form, Input,Table, Button, DatePicker, Upload, InputNumber, Switch,Select  } from 'antd';
import { createTodo, fetchAllTodo,fetchOneTodo,todolistSelector } from '../../../api/todolist';
import { fetchOnepayslip } from '../../../api/payslip'; 
import { authenticateSelector } from '../../../api/authSlice';

const { Option } = Select;

export default function CreateTodoList({cancel}){
  const options = ['High','Medium','Low']
    const status = ['New','in-Progress','Completed']
   
    const { all_todo} = useSelector(todolistSelector) 
 
    const {  user} = useSelector(authenticateSelector)
    console.log(user);
    const [loading, setLoading] = useState(false)
    const [filter,setFilter]=useState([])
    const [type, setType] = useState(false)

    const dispatch = useDispatch();
 
    
    useEffect(()=>{

      // dispatch(fetchAllEmployee())
      dispatch(fetchAllTodo(user?._id))
    
         
         
          }, [user])

          const handleChangeSelect = (value) =>{
            setLoading(value)
        
        }
       var date = new Date();
       let current_date= moment(date).format('YYYY-MM-DD')
      //  let current_date = moment(date).format('DD-MM-YYYY')
      //  let current_date = date.getDate()+"-"+(date.getMonth()+1)+"-"+ date.getFullYear();  
      //  let current_date = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate() 
       console.log(current_date); 
 
        const onFinish = (values) => {
          
            let status = "New"
            let showPriority = values.priority == 1?"High":values.priority == 2?"Medium":"Low";
            const data ={
              
              title:values.title,
              date:date,
              status:status,
              priority:values.priority ,
              startdate:current_date,
              enddate:current_date,
              showPriority:showPriority,
              employee:user?._id,
            }
            
            console.log("data created succesfully",data)
            dispatch(createTodo(data))
            };

            
            const onFinishFailed = (errorInfo) => {
              console.log('Failed:', errorInfo);
            };
 
    return(
        <div className='create'>
        <Form 
          className=' grid grid-cols-3 gap-4'
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}>
        
        <Form.Item
          label="Title"
          name="title"
          
          rules={[{ required: true, message: 'Please input title' }]}
        >

        <Input placeholder="enter your task here"/>
        </Form.Item>
 
        <Form.Item
          label="Priority"
          name="priority"
          rules={[{ required: true, message: 'Please select the priority' }]}>
            <Select

         
              placeholder="select Priority"
              onChange={handleChangeSelect}
              filterOption={(input, option) =>
                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
              }
            >
           
          <Option value ={1}>High</Option>
          <Option value ={2}>Medium</Option>
          <Option value ={3}>Low</Option>
 
          </Select>
       
        
        </Form.Item>
          <Form.Item>
          <Button className = "mr-22 mt-12" type="primary" htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>
      
      {/* <div className='dropdown'>
      <Select

          className="shadow" 
          placeholder="select the priority"
          onChange={handlePriority}
          filterOption={(input, option) =>
                      option.toLowerCase().indexOf(input.toLowerCase()) >= 0
                       }
      >
      {
          options.map((item)=>{  
          return <option  key={item._id} value={item} >{item}</option>
      })
      }

    </Select>
      </div> */}
 
      
</div>
    );
}
