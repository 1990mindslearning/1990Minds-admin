import {Table,Space} from 'antd'
import { FaRegTrashAlt, FaRegEdit } from 'react-icons/fa';
import DeleteConfirm from '../../shared/deleteConfirm'
import {Link} from 'react-router-dom'
import { deleteClient } from '../../../api/clients';
import {deleteCredential} from '../../../api/credential'
import { useDispatch } from 'react-redux';
import { deleteProject } from '../../../api/project';

export default function ClientTable({data}){
    console.log(data)
    const dispatch = useDispatch()
    
    const confirm = (e, id) => {
        dispatch(deleteClient(id._id, id.client))
        // dispatch(deleteCredential(id._id,id.credential))
        // dispatch(deleteProject(id._id,id.project))
       
      }
      
      const cancel = (e) =>{
        return null
      }

    const columns = [
        // {
        //     title:'Logo',
        //     dataIndex:'company_logo',
        //     key:'Logo',
        // },
        {
            title:'Client',
            dataIndex:'company_name',
            key:'client name'

        },
        {
            title:'Phone Number',
            dataIndex:'phone_number',
            key:'phone_number'
        },
        {
            title:'Email',
            dataIndex:'email',
            key:'email',
        },
        {
            title:'Action',
            key:'action',
            render:(id) =>(
            <Space size="middle">
               
              
                <h5 className="text-secondary" >
                <Link to={`/dashboard/edit-client/${id._id}`} >
    
                  <FaRegEdit onClick={()=><Link></Link>}  /> 
                   </Link>             
                  
                  </h5>
              <h5 className="text-danger">
                  <DeleteConfirm confirm={(e)=>confirm(e, id)} title="Client" cancel={cancel}   >
                      <FaRegTrashAlt style={{cursor:"pointer",color:"#e43d3d"}}  />
                  </DeleteConfirm>
              </h5>
              </Space>
     
            )
        }
    ]

        return(
    <Table 
        rowKey = {record => record._id}
        columns={columns}
        dataSource={data} /> )
}