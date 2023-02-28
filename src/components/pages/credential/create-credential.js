
import {Form,Button,Card,Input,InputNumber,Select,Row,Col, DatePicker} from 'antd'
import { useSelector,useDispatch } from 'react-redux'
import { useState } from 'react'
import {clientSelector} from '../../../api/clients'
import {createCredential} from '../../../api/credential'

export default function Create_credential(){
    const dispatch = useDispatch();
    const {all_client} = useSelector(clientSelector)
    const [select,setSelect] = useState("")

    const handleService = (value)=>{
        console.log(value)
        setSelect(value)
        
    }

    const credentialFinish = (value)=>{
        console.log(value)
        const data ={

            
            company_name:value.company_name,
            service_type:value.service_type,

            digitalMarketing:{
                media_type:value.media_type,
                link:value.link,
                username:value.username,
                password:value.password,
                recovery_phn:value.recovery_phn,
            },

            webApp:{
                server_type:value.server_type,
                webapp_hosting:value.webapp_hosting,

                frontEnd:{
                    front_hosting:value.front_hosting,
                    front_lib:value.front_lib,
                    front_username:value.front_username,
                    front_password:value.front_password,
                },
                server:{
                    server_hosting:value.server_hosting,
                    server_lib:value.server_lib,
                    server_username:value.server_username,
                    server_password:value.server_password,
                },
                database:{
                    db_hosting:value.db_hosting,
                    db_lib:value.db_lib,
                    db_username:value.db_username,
                    db_password:value.db_password,

                },
            },


            // website
            Website:{
                website_type:value.website_type,
                hosting:{
                    website_hosting:value.website_hosting,
                    hosting_username:value.hosting_username,
                    hosting_password:value.hosting_password,
                    hosting_expiry_date:value.hosting_expiry_date,
                    hosting_account:value.hosting_account,
                    hosting_renewal_amount:value.hosting_renewal_amount,
                    hosting_recovery_no:value.hosting_recovery_no,
                },
                domain:{
                    domain_details:value.domain_details,
                    domain_username:value.domain_username,
                    domain_password:value.domain_password,
                    domain_expiry_date:value.domain_expiry_date,
                    domain_account:value.domain_account,
                    domain_renewal_amount:value.domain_renewal_amount,
                    domain_recovery_no:value.domain_recovery_no,
                },
                frontEnd:{
                    frontend_hosting:value.frontend_hosting,
                    frontend_lib:value.frontend_lib,
                    frontend_username:value.frontend_username,
                    frontend_password:value.frontend_password,
                },
            },
        }
        dispatch(createCredential(data))      
}

    return (
        <>
        <Form onFinish={credentialFinish}>
        <div className=' grid grid-cols-2'>
            <Form.Item
               label="Company Name"
               name="company_name"
               className=' w-96'>
            <Select>
            {
                all_client.map((item)=>{
                    return <option key={item._id} value={item._id}>{item.company_name}</option>
                })
            }

            </Select>
            </Form.Item>
            <Form.Item
                label = "Service type"
                name = "service_type"
                className=' w-96'>
                <Select onChange={handleService}
                        value={select} >
                                 <option value = "Digital Marketing" key={1}>Digital Marketing</option>
                                 <option value = "WebApp" key={2}>WebApp</option>
                                 <option value = "Website" key={3}>Website</option>
                </Select>
            </Form.Item>
            </div>
            <div>
            {
            select === 'Digital Marketing'?
                    <><Form.Item
                         label = "Media"
                         name = "media_type">
                         <Input/>

                    </Form.Item>
                    <Form.Item
                         label = "Link"
                         name = "link">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                         label = "Username"
                         name = "username">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                         label = "Password"
                         name = "password">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                         label = "Recover phone"
                         name = "recovery_phn">
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 20, offset: 9}}>
                    <Button type="primary" htmlType='submit'>
                        Submit
                    </Button>
                    </Form.Item></>:select === 'WebApp'?
                        <div className=' grid grid-cols-3 gap-4'>

                        <Card >
                        <Form.Item
                            label = "Server Type"
                            name = "server_type">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label = "Hosting"
                        name = "webapp_hosting">
                    <Input/>
                </Form.Item>
            </Card>
            <Card >
           <h2 className=' text-center'>Front end</h2>
             <Form.Item
                    label = "Hosting"
                    name = "front_hosting">
                    <Input/>
            </Form.Item>
                <Form.Item
                    label = "Libraries"
                    name = "front_lib">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Username"
                    name = "front_username">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Password"
                    name = "front_password">
                    <Input/>
                </Form.Item>
            </Card>
            <Card className=' align-top'>
            <h2 className=' text-center'>Server</h2>
                    
                <Form.Item
                    label = "Hosting"
                    name = "server_hosting"
                    >
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Libraries"
                    name = "server_lib">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Username"
                    name = "server_username">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Password"
                    name = "server_password">
                    <Input/>
                </Form.Item>

                </Card>
                <Card>
                <h2 className=' text-center'>Database</h2>                       
                <Form.Item
                    label = "Hosting"
                    name = "db_hosting">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Libraries"
                    name = "db_lib">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Username"
                    name = "db_username">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Password"
                    name = "db_password">
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button className=' float-right' type="primary" htmlType='submit'>
                        Submit
                    </Button>
                    </Form.Item>
                    </Card>
                    </div>
                :select === 'Website'?
                <>
                <Form.Item
                    label = "Website Type"
                    name = "website_type">
                    <Input/>
                </Form.Item>
                
                <div className=' grid grid-cols-2 gap-4'>

                <Card>
                <h2 className=' text-center'>Hosting</h2>
        
                    <Form.Item
                        label = "Hosting"
                        name = "website_hosting">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label = "Username"
                        name = "hosting_username">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label = "Password"
                        name = "hosting_password">
                        <Input/>
                    </Form.Item>
                    <Form.Item
                        label = "Expiry Date"
                        name = "hosting_expiry_date">
                        <DatePicker picker='date'/>
                    </Form.Item>
                    <Form.Item
                        label = "Account"
                        name = "hosting_account">
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item
                        label = "Renewal Amount"
                        name = "hosting_renewal_amount">
                        <InputNumber/>
                    </Form.Item>
                    <Form.Item
                        label = "Recovery no"
                        name = "hosting_recovery_no">
                        <InputNumber/>
                    </Form.Item>
            </Card>
            <Card>
            <h2 className=' text-center'>Domain</h2>
                <Form.Item
                    label = "Details"
                    name = "domain_details">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Username"
                    name = "domain_username">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Password"
                    name = "domain_password">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Expiry Date"
                    name = "domain_expiry_date">
                    <DatePicker picker='date'/>
                </Form.Item>

                <Form.Item
                    label = "Account"
                    name = "domain_account">
                    <InputNumber/>
                </Form.Item>
                <Form.Item
                    label = "Renewal Amount"
                    name = "domain_renewal_amount">
                    <InputNumber/>
                </Form.Item>
                <Form.Item
                    label = "Recovery phone"
                    name = "domain_recovery_no">
                    <InputNumber/>
                </Form.Item>
                </Card>
                <Card>
                <h2 className=' text-center'>Front End</h2>
                <Form.Item
                    label = "Hosting"
                    name = "frontend_hosting">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Libraries"
                    name = "frontend_lib">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Username"
                    name = "frontend_username">
                    <Input/>
                </Form.Item>
                <Form.Item
                    label = "Password"
                    name = "frontend_password">
                    <Input/>
                </Form.Item>
                <Form.Item>
                    <Button className=' float-right' type="primary" htmlType='submit'>
                        Submit
                    </Button>
                </Form.Item>
            </Card>
            </div>
            </>:""
            }
            </div>
            </Form>
        </>      
    )

}