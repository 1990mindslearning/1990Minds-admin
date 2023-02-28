import { useEffect, useState } from 'react'
import {useParams,  useLocation} from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { credentialSelector, fetchAllCredential, fetchOneCredential } from '../../../api/credential';
import {Card,Form,Tabs, Input,InputNumber} from 'antd'
import moment from 'moment';
import Item from 'antd/lib/list/Item';

const {Meta} = Card;


export default function ShowCredentials(){
    const {id} = useParams()
    const {current_credential} = useSelector(credentialSelector)

    console.log("Now:",current_credential)
    const dispatch = useDispatch();
    const [crdential_data,setCredential] = useState([])
    
    useEffect(()=>{
        dispatch(fetchOneCredential(id))   
    
    },[])

    return(
        <>
        
            <Tabs defaultActiveKey='Digital Marketing'>
            {
                current_credential.map((item)=>{
                    return <Tabs.TabPane tab = {item.service_type} key={item._id}>
                        {item.service_type === 'Digital Marketing'? 
                        <div className='p-5 grid grid-cols-2'>
                        <Card hoverable={true}>
                        <h1 className=' text-center text-purple-600 mb-8 border-b-2 border-grey-400'>Digital Marketing</h1>
                        <p><span>Media type</span>:{item.digitalMarketing?.media_type}</p>
                        <p><span>Link</span>:{item.digitalMarketing?.link}</p>
                        <p><span>Username</span>:{item.digitalMarketing?.username}</p>
                        <p><span>Password</span>:{item.digitalMarketing?.password}</p>
              
                        </Card>
                        </div>
                        
                        : item.service_type === 'WebApp'?
                        <div className='p-5 grid grid-cols-3'>
                           <Card hoverable={true}>
                           <h1 className=' text-center text-purple-600 mb-8 border-b-2 border-grey-400'>FrontEnd</h1>
                              <p><span>Hosting</span>:{item.webApp?.frontEnd?.front_hosting}</p>
                              <p><span>Libraries</span>:{item.webApp?.frontEnd?.front_lib}</p>
                              <p><span>Username</span>:{item.webApp?.frontEnd?.front_username}</p>
                              <p><span>Password</span>:{item.webApp?.frontEnd?.front_password}</p>
                           </Card>

                           <Card hoverable={true}>
                           <h1 className=' text-center text-purple-600 mb-8 border-b-2 border-grey-400'>Server</h1>
                              <p><span>Hosting</span>:{item.webApp?.server?.server_hosting}</p>
                              <p><span>Libraries</span>:{item.webApp?.server?.server_lib}</p>
                              <p><span>Username</span>: {item.webApp?.server?.server_username}</p>
                              <p><span>Password</span>: {item.webApp?.server?.server_password}</p>
                           </Card>

                           <Card hoverable={true}>
                           <h1 className=' text-center text-purple-600 mb-8 border-b-2 border-grey-400'>Database</h1>
                              <p><span>Hosting</span>:{item.webApp?.database?.db_hosting}</p>
                              <p><span>Libraries</span>:{item.webApp?.database?.db_lib}</p>
                              <p><span>Username</span>: {item.webApp?.database?.db_username}</p>
                              <p><span>Password</span>: {item.webApp?.database?.db_password}</p>
                           </Card>
                           </div>:item.service_type === 'Website'?
                           <div className='p-5 grid grid-cols-3'>
                        <Card bordered={true}
                              hoverable={true}>
                           <h1 className=' text-center text-purple-600 mb-8 border-b-2 border-grey-400'>Hosting</h1>
                           <p><span>Hosting</span>:{item.Website?.hosting?.website_hosting}</p>
                           <p><span>Username</span>:{item.Website?.hosting?.hosting_username}</p>
                           <p><span>Password</span>:{item.Website?.hosting?.hosting_password}</p>
                           <p><span>Expiry Date</span>:{moment(item.Website?.hosting?.hosting_expiry_date).format("DD-MM-YYYY")}</p>
                           <p><span>Account</span>:{item.Website?.hosting?.hosting_account}</p>
                           <p><span>Renewal Amount</span>:{item.Website?.hosting?.hosting_renewal_amount}</p>
                           <p><span>Recovery Number</span>:{item.Website?.hosting?.hosting_recovery_no}</p>
                        </Card> 
                        <Card hoverable={true}>
                           <h1 className=' text-center text-purple-600 mb-8 border-b-2 border-grey-400'>Domain</h1>
                           <p><span>Details</span>:{item.Website?.domain?.domain_details}</p>
                           <p><span>Username</span>:{item.Website?.domain?.domain_username}</p>
                           <p><span>Password</span>:{item.Website?.domain?.domain_password}</p>
                           <p><span>Expiry Date</span>:{moment(item.Website?.domain?.domain_expiry_date).format("DD-MM-YYYY")}</p>
                           <p><span>Account</span>:{item.Website?.domain?.domain_account}</p>
                           <p><span>Renewal Amount</span>:{item.Website?.domain?.domain_renewal_amount}</p>
                           <p><span>Recovery Number</span>:{item.Website?.domain?.domain_recovery_no}</p>
                        </Card>
                        <Card hoverable={true}>
                           <h1 className=' text-center text-purple-600 mb-8 border-b-2 border-grey-400'>Front End</h1>
                           <p><span>Hosting</span>:{item.Website?.frontEnd?.frontend_hosting}</p>
                           <p><span>Libraries</span>:{item.Website?.frontEnd?.frontend_lib}</p>
                           <p><span>Username</span>:{item.Website?.frontEnd?.frontend_username}</p>
                           <p><span>Password</span>:{item.Website?.frontEnd?.frontend_password}</p>

                        </Card>
                        </div>:""
                        
                        }
                    </Tabs.TabPane>
                })
            }
               
           
               
            </Tabs>
        
        </>
    )
}