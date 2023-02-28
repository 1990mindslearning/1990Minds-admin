import { Table ,Button, Form,Select} from "antd"
import moment from "moment";
import {EyeOutlined} from '@ant-design/icons'
import { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from 'axios'
import { keyUri} from '../../../key'
import { authenticateSelector } from '../../../api/authSlice';
import {Link} from 'react-router-dom'
import { fetchAllEmployee,fetchOneEmployee,employeeSelector } from '../../../api/employee';
import { leaveRequestSelector, updateLeave } from "../../../api/leaveRequest";

import { fetchEmployeepayslip,payslipSelector } from '../../../api/payslip';
import { fetchEmployeeLeave } from "../../../api/leaveRequest";
 
// import ShowLeave from './showleave'
import ModalForm from '../../shared/modal'

import styled from 'styled-components'

 

export default function LeaveRequestTable({data}){
  const { all_employee} = useSelector(employeeSelector) 
  const [filter,setFilter] = useState([])
  const [load,setLoad] = useState(false)


  const [visibleEdit, setEditModal] = useState(false);
  const [current_leave, setLeave] = useState(null); 

    const dispatch = useDispatch()  
    const {  role,user} = useSelector(authenticateSelector) 
 
 
  

    const handleClickSee =(e,isvisible,id)=>{
      e.preventDefault()
      console.log("Clicked Edit",id)
      setLeave(id)
      console.log(current_leave)
      setEditModal(isvisible) 
    }

    const handleEmployee = (value)=>{
      setLoad(true)
      console.log(value)
      dispatch(fetchOneEmployee(value))
      axios.get(keyUri.BACKEND_URI +`/leaverequest/${value}`).then(({data})=>{
      setFilter(data.leave) 
      console.log("The filter is:",filter)  
     });
    
  }
    console.log("all leave:",data);
    const columns =[
      role == 'admin'?
        {  
            title:"Employee Name",
            key: 'employee',
            render:(item)=>{
              return  <p className=" m-0  uppercase" >{item.employee?.personal?.full_name}</p>  
            }
        }:<div></div>,
        {
            title:"From",
            dataIndex:"date_from",
            key:'date_from',
          render: text => <p>{moment(text).format('DD/MM/YYYY')}</p>

        },
        {
            title:"To",
            dataIndex:"date_to",
            key:'date_to',
            render: text => <p>{moment(text).format('DD/MM/YYYY')}</p>

        },
        role == 'employee'?
        {
            title:"Status",
            key:'aproove',
            render: text =>  
             <div>
                {
                role === 'employee'?
                           <p style={{color:text.aproove?`green`:`red`}}>{text.aproove? "Approved": text.created?"Status Pending":"Rejected"}</p>
                           :
                            
                            <EyeOutlined style={{fontSize:"1.2rem",color:"blue"}} onClick={(e)=>handleClickSee(e, true, text)}/>
                         
                }
             </div>
        }:
        {
          title:"Your Decision",
          key:'aproove',
          render: text =>  
           <div>
              {
              role === 'employee'?
                         <p style={{color:text.aproove?`green`:`red`}}>{text.aproove? "Approved": text.created?"Status Pending":"Rejected"}</p>
                         :
                         text.created?
                          <Link to = {`/dashboard/show-leave/${text._id}`}><EyeOutlined style={{fontSize:"1.2rem",color:"blue"}} onClick={(e)=><Link></Link>}/></Link>
                          :<div style={{color:text.aproove?`green`:`red`}}>{text.aproove? "Approved":"Rejected"}</div> 
              }
           </div>
      },
      role == 'employee'?
      {
        title:"Comments",
        dataIndex:'comments'

      }:<div></div>,
 



    ]
    return(
      <DataTableWrap>
            {/* <Select

className="shadow" 
placeholder="select the Employee"
onChange={handleEmployee}
filterOption={(input, option) =>
                     option.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
{
all_employee.map((item)=>{  
  return <option  key={item._id} value={item._id} >{item.personal?.full_name}</option>
})
}

</Select>  */}
        <Table
        rowKey={ record =>record._id}
        columns= {columns}
        dataSource = {data}/>

        <ModalForm 
            isVisible={visibleEdit} 
            title="Leave Request"
            footer={false}
            className="shadow"
            width="60%"
            cancel={()=>setEditModal(!visibleEdit)}>
                  {/* <ShowLeave current_leave={current_leave} cancel={()=>setEditModal(!visibleEdit)}/> */}
            </ModalForm>
            </DataTableWrap>
    )
}




const DataTableWrap = styled.div`

.multidelete{
  position:absolute;

  top:9%;

  left:14.25%;
  transform:translate(-50%, -50%);
  width:84.5%;
  height:3.5rem;
 background-color:#F1F6F9;
font-size:1rem;
}

@media(max-width:1550px) {
  .multidelete{
    top:11%;

  width:79%;
  left:19.25%; 


   }



}


@media(max-width:1450px) {
  .multidelete{
    top:11%;

  width:75%;
  left:19.25%;


   }



}

@media(max-width:1750px) {
  .multidelete{
    top:10%;

  width:81.9%;
  left:16.6%;


   }



}
` 


// text =>  
// <div>
//   {
//     role === 'employee'?
//                  <p style={{color:text.aproove?`green`:`red`}}>{text.aproove? "Aprooved": text.created?"Status Pending":"Rejected"}</p>
//                  :
//                                   <EyeOutlined style={{fontSize:"1.2rem",color:"blue"}} onClick={(e)=>handleClickSee(e, true, id)}   /> 


//   }
// </div>


