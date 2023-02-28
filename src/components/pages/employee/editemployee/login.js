import {DatePicker,message, Button,Form ,Input,Select,InputNumber } from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import { useDispatch } from 'react-redux';
import moment from 'moment'
import { useEffect,useState } from 'react';


export default function Login({actionMethod,data,info}){
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [password ,setPassword] = useState("");
    const [confirm,setConfirm] = useState("");

    const onfinishLogin = (values)=>{
      console.log(values)
      if(values.password)
      setPassword(values.password)
      console.log(password)
      if(values.confirm_password)
      setConfirm(values.confirm_password)
      console.log(confirm)
            const logindata = {
               email:values.office_email,
               password:values.password != undefined ? values.password : data?.password,
               confirm_password:values.confirm_password != undefined ? values.confirm_password : data?.confirm_password,
            }
            console.log(logindata)
            dispatch(actionMethod())
            dispatch(info(logindata))
        }
        const onFinishFailed = (errorInfo) => {
            console.log('Failed:', errorInfo);
          };
        

    useEffect(()=>{
        form.setFieldsValue({
            office_email:data?.office_email,
            // password:data?.password,
            // confirm_password:data?.confirm_password,

        })
    },[data])
    return(
        <div className="mt-5 mx-5">
            <Form onFinish={onfinishLogin}
                 name = 'login'
                  form = {form}
                  labelCol={{ span: 24 }}
                  wrapperCol={{ span: 24 }}
                  initialValues={{remember:true}}
                  onFinishFailed={onFinishFailed}>
                  <div className="grid grid-cols-2 gap-4">
                  <div>
                  <Form.Item
                        label={<p className=" text-left m-0 w-32">Username</p>}
                        name="office_email"
                        >
                        <Input  placeholder='Office email'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-32">Password</p>}
                        name ="password"
                        rules={[{min: 8, message: 'password must be atleast 8 characters'}]} hasFeedback>
                        <Input.Password placeholder='Password'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-96">Confirm Password</p>}
                        name ="confirm_password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[{ message:'please confirm your password'},
                                   ({ getFieldValue }) => ({
                                     validator(value) {
                                       if (!value || getFieldValue('password') === getFieldValue('confirm_password')) {
                                         return Promise.resolve();
                                       }
                         
                                       return Promise.reject('The two Passwords that you Entered Do Not Match!');
                                     },
                                   }),
                                 ]} >
                        <Input.Password placeholder='Confirm Password'/>
                    </Form.Item>
                    <Form.Item className="text-right">
                        <Button type="primary" htmlType="submit">
                          Next
                        </Button>
                    </Form.Item>
                    </div>

                    <div></div>
                  </div>
                   
                   
                 
           </Form>
        </div>
    )
} 