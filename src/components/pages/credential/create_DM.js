import {Form,Button,Input,InputNumber,Select,Row,Col, DatePicker} from 'antd'

export default function Create_digitalMarketing(){

    const finishDM = (value)=>{
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
        }
    }
    return(
        <div>
        <Form onFinish={finishDM}>
            <Form.Item
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
                    </Form.Item>
           </Form>
        </div>
    )
}