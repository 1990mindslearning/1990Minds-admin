import { useState } from "react"
import { Button } from "antd"
import {PlusOutlined} from '@ant-design/icons'
import ModalForm from "../../shared/modal"
import CreateClient from "./createclient"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { useSelector } from "react-redux"
import Loader from '../../shared/loader'
import ClientTable from './client-table'
import { clientSelector, fetchAllClient } from "../../../api/clients"
import {Link} from 'react-router-dom'


export default function ClientHome (){

    const dispatch = useDispatch()
 
  const { loading ,all_client} = useSelector(clientSelector) 

    useEffect(()=>{
        dispatch(fetchAllClient())
    },[])
    return(
        <div>
            <Link to="/dashboard/create-client"><Button onClick={()=><Link></Link>} type="primary" icon={<PlusOutlined />}>
                    Add Client</Button></Link>
                      {
                          loading ? <Loader/> :  <ClientTable data={all_client}/>
                      }
        </div>
   
    )
}