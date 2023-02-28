import { Form,Input,message,Button} from "antd";
import { useEffect,useLayoutEffect,useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import {employeeSelector} from '../../../../api/employee'

 


export  default function Login({actionMethod,info}){

    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const loginPage = useRef()
    const {employee_data} = useSelector(employeeSelector)

    console.log("Employee",employee_data)
    const onfinishLogin = (values)=>{
        // if(values.confirm_password !== values.password)
        //   return message.error("Passwords doesn't match!!!") 
        // else{
            const logindata = {
               email:values.office_email,
               password:values.password,
               confirm_password:values.confirm_password,
            }
            dispatch(actionMethod())
            // console.log("the login data is",logindata)
          
            dispatch(info(logindata))
        }
        

    
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      useEffect(()=>{
        form.setFieldsValue({
          office_email:employee_data.office_email,
        })

      },[employee_data])

      // useLayoutEffect(()=>{
      //   loginPage.

      // },[employee_data])

    return(
        <div className="mt-5 mx-5" ref={loginPage}>
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
                        rules={[{required:true,min: 8, message: 'password must be atleast 8 characters'}]} hasFeedback>
                        <Input.Password placeholder='Password'/>
                    </Form.Item>
                    <Form.Item
                        label={<p className=" text-left m-0 w-96">Confirm Password</p>}
                        name ="confirm_password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[{  required:true,message:'please confirm your password'},
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