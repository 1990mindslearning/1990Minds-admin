import {Button} from 'antd'
import { useState,useEffect } from "react"
import {PlusOutlined} from '@ant-design/icons'
import ModalForm from "../../shared/modal"
import CreateCredential from './createcredential'
import { useDispatch, useSelector } from "react-redux"
import { clientSelector, fetchAllClient } from "../../../api/clients"
import {credentialSelector, fetchAllCredential} from "../../../api/credential"
import {Link} from 'react-router-dom'
import CredentialManagementTable from './credentialTable'
import Loader from '../../shared/loader'


export default function CredentialHome (){
 
    const dispatch = useDispatch()
    const {all_client} = useSelector(clientSelector)
    const {loading,all_credential} = useSelector(credentialSelector)
    console.log(all_credential)
 
    useEffect(()=>{
        dispatch(fetchAllClient())
        dispatch(fetchAllCredential())
    },[])
   

    return(
        <div>
                 <Link to="/dashboard/create-credentials" data = {all_client}><Button onClick={()=> <Link></Link>} type="primary" icon={<PlusOutlined />}>
                    Add Credentials</Button></Link>   
                    
            {
            loading ? <Loader/> :  <CredentialManagementTable data={all_credential}/>
          }         
        </div>
    )
}