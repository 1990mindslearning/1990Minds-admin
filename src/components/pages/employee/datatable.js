import React,{useState} from 'react'
import { Table, Tag, Space, } from 'antd';
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import {BsDownload}  from 'react-icons/bs';
import DeleteConfirm from '../../shared/deleteConfirm'
import {useDispatch} from 'react-redux'
import {deleteEmployee,deleteManyEmployee} from '../../../api/employee'
import EditEmployee from './editemployee'
import {Link} from 'react-router-dom'
import ModalForm from '../../shared/modal'
import { FaTrashAlt} from 'react-icons/fa'
import styled from 'styled-components'
import {AiOutlineClose} from 'react-icons/ai'
import moment from 'moment';

export default function EmployeeTable1({data,intialdata}) {
  console.log("Employee is,",data)

  const [visibleEdit, setEditModal] = useState(false);
  const [curr_employee, setEmployee] = useState(null);
  console.log(curr_employee);
  const [selectionType, setSelectionType] = useState('checkbox');
const [selectionKey, setSelectionKey] = useState([]);
const [page, setPage] = useState(1);

const dispatch = useDispatch()

    const confirm = (e, id) => {
        dispatch(deleteEmployee(id._id, id.employee))
       
      }
      
      const cancel = (e) =>{
        return null
      }

      

      const handleClickEdit = (e, isvisible, id) =>{
        e.preventDefault()
        setEmployee(id)
        setEditModal(isvisible)
        }

        const closeModal = () => {
          setEditModal(false)
          setEmployee(null)
        }

      
    const columns = [
        {
            title:'Emp ID.',
            key: 'employee.emp_id',
            render:(t, k, i)=>{
              return <p class="m-0 ">{(page - 1) * 10 + (i+1)}</p>
            }
          },
          
        {
          title: 'Employee Name',
          key: 'full_name',
          render: text => <p className="m-0">{text.full_name}</p>

          
        },

        {
          title: 'Designation',
          key: 'designation',
          render: text => <p className="m-0">{text?.designation}</p>

          
        },

        {
          title: 'Phone number',
          key:'phone_number',
          render: text => <p className="m-0">{text?.employee?.phone_number}</p>
          
          
        },
        {
          title: 'Email',
          key: 'email',
          render: text => <p className="m-0">{text?.employee?.office_email}</p>

          
        },
     
        {
          title: 'DOJ',
          key: 'DOJ',
          render: text => <p className="m-0">{moment(text).format('DD/MM/YYYY')}</p>

        },

        // {
        //   title: 'Download',
        //   dataIndex: 'Download',
        //   key: 'Dowload',
        //   render: (id) => (
        //     <Space size="middle">
              
        //     <h5 className="text-secondary" >
        //     <Link to={``} >

        //       <BsDownload /> 
        //        </Link>             
              
        //       </h5>
        //       </Space>
         
        //   )
        // },

        
        {
          title: 'Action',
          key: 'action',
          render: (id) => (
            <Space size="middle">
              
            <h5 className="text-secondary" >
            <Link to={`/dashboard/database-management/edit-employee/${id._id}`} >

              <FaRegEdit  onClick={(e)=>handleClickEdit(e, true, id)} className="text-secondary mt-2"  /> 
               </Link>             
              
              </h5>
          <h5 className="text-danger">
              <DeleteConfirm confirm={(e)=>confirm(e, id)} title="employee" cancel={cancel} >
                  <FaRegTrashAlt style={{cursor:"pointer"}} />
              </DeleteConfirm>
          </h5>

          </Space>
          ),
        },
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
            dataSource={data}
            scroll={{ x: 1300 }} /> 


<ModalForm 
            isVisible={visibleEdit} 
            title="EDIT EMPLOYEE"
            footer={false}
            className=""
            width="65%"
            cancel={()=>setEditModal(!visibleEdit)}>
                  <EditEmployee current_employee={curr_employee} cancel={()=>setEditModal(!visibleEdit)}/>
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