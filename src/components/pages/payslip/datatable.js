import React,{useState} from 'react'
import { Table, Tag, Space,Button } from 'antd';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import DeleteConfirm from '../../shared/deleteConfirm'
import {useDispatch,useSelector} from 'react-redux'
import {deletePayslip,createPayslipPdf} from '../../../api/payslip'
import {Link} from 'react-router-dom'
import { motion } from "framer-motion";
import { FaTrashAlt} from 'react-icons/fa'
import styled from 'styled-components'
import {AiOutlineClose} from 'react-icons/ai'
import ModalForm from '../../shared/modal'
import moment from 'moment';
import Editpayslip from './editpayslip';
import {BsDownload}  from 'react-icons/bs';
import { authenticateSelector } from '../../../api/authSlice';


export default function PayslipTable({data,intialdata}) {
  console.log("All payslips",data)

  const [visibleEdit, setEditModal] = useState(false);
  const [current_payslip, setPayslip] = useState(null); 
const [selectionType, setSelectionType] = useState('checkbox');
const [selectionKey, setSelectionKey] = useState([]);
const [page, setPage] = useState(1);
const [item,setItem] =useState(null)
const [downloadLoading,setDownloadLoading] =useState(false)


const {role } = useSelector(authenticateSelector)

    const dispatch = useDispatch()

    const confirm = (e, id) => {
        dispatch(deletePayslip(id._id, id.payslip))
       
      }
      
      const cancel = (e) =>{
        return null
      }

      const handleClickEdit = (e, isvisible, id) =>{
        e.preventDefault()
        setPayslip(id)
        setEditModal(isvisible)
        }

        const closeModal = () => {
          setEditModal(false)
          setPayslip(null)
        }

        
    const createPdf= (value)=> {
   
            
      setDownloadLoading(true)
      setItem(value._id)
      dispatch(createPayslipPdf(value))
      
      setTimeout(()=>{
        setDownloadLoading(false)
          setItem(null)
      },3000)
}
  
    const columns = [
     
          
        {
          title: 'Employee',
          dataIndex:'employee',
          key: 'employee',
         
          render: text => <p className="m-0">{text.personal?.full_name}</p>
        },
        {
          title: 'month',
          dataIndex: 'month',
          key: 'month',
          render: text => <p className="m-0">{moment(text).format('YYYY-MM')}</p>
        },
        {
            title: 'Deductions LOP',
            dataIndex: 'deductions_LOP',
            key: 'deductions_LOP',
          },

        {
          title: 'Deductions WFH',
          dataIndex: 'deductions_WFH',
          key: 'deductions_WFH',
          
        },

        
        
     
        {
          title: 'Net Salary',
          dataIndex: 'Net_Salary',
          key: 'Net_Salary',
         
         
        },
        {
           
    
      title:'Download Payslip',
      render: (value) => { 
          return <Button disabled={(downloadLoading && item === value._id) ? true : false } 
                  style={{backgroundColor:"#3498db24", color:'var(--brandColor)',boxShadow:'none'}} type="primary" onClick={()=>createPdf(value)}>
          {(downloadLoading && item === value._id) ? 'Loading': 'Download'}
            </Button>
      }
    },
           role == 'admin'?
        {
          title: 'Action',
          key: 'action',
          render: (id) => (
            <Space size="large" align="center">
              
            <h5 className="text-secondary" >
            <Link to={`/dashboard/database-management/edit-payslip/${id._id}`} >

              <FaRegEdit onClick={(e)=>handleClickEdit(e, true, id)} className="text-secondary" style={{color: "#008080"}}   /> 
               </Link>             
              
              </h5>
          <h5 className="text-danger">
              <DeleteConfirm confirm={(e)=>confirm(e, id)} title="payslip" cancel={cancel} >
                  <FaRegTrashAlt style={{cursor:"pointer",color:"#e43d3d"}} />
              </DeleteConfirm>
          </h5>

          </Space>
          ),
        } : 
          <h1>Hello</h1>
        
        
      ];


      const rowSelection = {
        onChange: (selectedRowKeys, selectedRows) => {


          setSelectionKey(selectedRowKeys)
        },
        getCheckboxProps: (record) => ({
          disabled: record.name === 'Disabled User',
          // Column configuration not to be checked
          name: record.name,
        }),
      };

      const variants = {
        open: { opacity: 1, y: 0 },
        closed: { opacity: 0, y: "3.5rem" },
      }


      return (

 <DataTableWrap>

          
 <Table  


pagination={{
  onChange(current) {
    setPage(current)
  }
}}
           rowKey={record => record._id}
            columns={columns}
            dataSource={data} /> 

<ModalForm 
            isVisible={visibleEdit} 
            title="EDIT PAYSLIP"
            footer={false}
            className=""
            width="60%"
            cancel={()=>setEditModal(!visibleEdit)}>
                  <Editpayslip current_payslip={current_payslip} cancel={()=>setEditModal(!visibleEdit)}/>
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