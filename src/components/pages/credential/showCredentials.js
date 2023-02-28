import { useEffect, useState } from 'react'
import {useParams,  useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { credentialSelector, fetchAllCredential, fetchOneCredential } from '../../../api/credential';
import {Card,Form, Input,InputNumber} from 'antd'
import moment from 'moment';

const {Meta} = Card;


export default function ShowCredentials({record}){

 
    const {id} = useParams()
    const {current_credential} = useSelector(credentialSelector)

    console.log("Now:",current_credential)
    const dispatch = useDispatch();
    const [crdential_data,setCredential] = useState([])
    
    useEffect(()=>{
        dispatch(fetchOneCredential(id))   
    
    },[])
    return (
    <div>
         <h1>Hello:{current_credential.service_type}</h1>
         {
            current_credential?.service_type ==="Digital Marketing"?
            <Card hoverable={true}>
            <h1>Digital Marketing</h1>
            <p>Media type:{current_credential.digitalMarketing.media_type}</p>
            <p>link:{current_credential.digitalMarketing.link}</p>
            <p>username:{current_credential.digitalMarketing.username}</p>
            <p>password:{current_credential.digitalMarketing.password}</p>
              
            </Card>: current_credential?.service_type === 'Website'? 
                      <div className='p-5 grid grid-cols-3'>
                        <Card bordered={true}
                              hoverable={true}>
                           <h1>Hosting</h1>
                           <p>Hosting:<b>{current_credential.Website.hosting.website_hosting}</b></p>
                           <p>Username:<b>{current_credential.Website.hosting.hosting_username}</b></p>
                           <p>Password:<b>{current_credential.Website.hosting.hosting_password}</b></p>
                           <p>Expiry Date:<b>{moment(current_credential.Website.hosting.hosting_expiry_date).format("DD-MM-YYYY")}</b></p>
                           <p>Account:<b>{current_credential.Website.hosting.hosting_account}</b></p>
                           <p>Renewal Amount:<b>{current_credential.Website.hosting.hosting_renewal_amount}</b></p>
                           <p>Recovery Number:<b>{current_credential.Website.hosting.hosting_recovery_no}</b></p>
                        </Card> 
                        <Card hoverable={true}>
                           <h1>Domain</h1>
                           <p>Details:<b>{current_credential.Website.domain.domain_details}</b></p>
                           <p>Username:<b>{current_credential.Website.domain.domain_username}</b></p>
                           <p>Password:<b>{current_credential.Website.domain.domain_password}</b></p>
                           <p>Expiry Date:<b>{moment(current_credential.Website.domain.domain_expiry_date).format("DD-MM-YYYY")}</b></p>
                           <p>Account:<b>{current_credential.Website.domain.domain_account}</b></p>
                           <p>Renewal Amount:<b>{current_credential.Website.domain.domain_renewal_amount}</b></p>
                           <p>Recovery Number:<b>{current_credential.Website.domain.domain_recovery_no}</b></p>
                        </Card>
                        <Card hoverable={true}>
                           <h1>Front End</h1>
                           <p>Hosting:<b>{current_credential.Website.frontEnd.frontend_hosting}</b></p>
                           <p>Libraries:<b>{current_credential.Website.frontEnd.frontend_lib}</b></p>
                           <p>Username:<b>{current_credential.Website.frontEnd.frontend_username}</b></p>
                           <p>Password:<b>{current_credential.Website.frontEnd.frontend_password}</b></p>

                        </Card>
                        </div>: current_credential.service_type === 'WebApp'?
                           <div className='p-5 grid grid-cols-2'>
                           <Card>
                           <h1>frontEnd</h1>
                              <p>Hosting:<b>{current_credential.webApp.frontEnd.front_hosting}</b></p>
                              <p>Libraries:<b>{current_credential.webApp.frontEnd.front_lib}</b></p>
                              <p>Username:<b>{current_credential.webApp.frontEnd.front_username}</b></p>
                              <p>Password:<b>{current_credential.webApp.frontEnd.front_password}</b></p>
                           </Card>

                           <Card>
                           <h1>Server</h1>
                              <p>Hosting:<b>{current_credential.webApp.server.server_hosting}</b></p>
                              <p>Libraries:<b>{current_credential.webApp.server.server_lib}</b></p>
                              <p>Username:<b> {current_credential.webApp.server.server_username}</b></p>
                              <p>Password:<b> {current_credential.webApp.server.server_password}</b></p>
                           </Card>

                           <Card>
                           <h1>Database</h1>
                              <p>Hosting:<b>{current_credential.webApp.database.db_hosting}</b></p>
                              <p>Libraries:<b>{current_credential.webApp.database.db_lib}</b></p>
                              <p>Username:<b> {current_credential.webApp.database.db_username}</b></p>
                              <p>Password:<b> {current_credential.webApp.database.db_password}</b></p>
                           </Card>
                           
                        </div>:""
         }
    </div>
    
    )
}