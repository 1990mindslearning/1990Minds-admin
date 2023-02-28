import {Form,Input,InputNumber,Button} from 'antd';
import { useEffect } from 'react';
 import { useDispatch } from 'react-redux';

export default function Bank({actionMethod,info,data}){
    const dispatch = useDispatch()
    const [form] = Form.useForm();
    const onfinishBank = (values)=>{
        var numbers = /^[0-9]+$/;
        
        const bankdata ={
            bank:{
                bank_name:values.bank_name,
                branch_name:values.branch_name,
                account_number:values.account_number,
                confirm_account_number:values.confirm_account_number,
                IFSC_code:values.IFSC_code,
                adhaar_number:values.adhaar_number,
                pancard:values.pancard,
    
           },
        }
        dispatch(actionMethod())
        dispatch(info(bankdata))

    }

    useEffect(()=>{
        form.setFieldsValue({
            bank_name:data?.bank?.bank_name,
            branch_name:data?.bank?.branch_name,
            account_number:data?.bank?.account_number,
            confirm_account_number:data?.bank?.confirm_account_number,
            IFSC_code:data?.bank?.IFSC_code,
            adhaar_number:data?.bank?.adhaar_number,
            pancard:data?.bank?.pancard,

        })

    },[])
    return(
        <div className="mt-5 mx-5">
        <Form onFinish = {onfinishBank}
              name ='bank'
              form = {form}
              labelCol={{span: 24}}
              wrapperCol={{span : 24}}
              initialValues={{remember:true}}>
        <div className="grid grid-cols-3 gap-4">    
        <Form.Item
            label={<p className=" text-left m-0 w-40">Name of the Bank</p>}
            name ="bank_name"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='Bank Name'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-40">Branch Name</p>}
            name ="branch_name"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='Bank Name'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-40">Account Number</p>}
            name ="account_number"
            rules={[{required:true, message: 'required!'}]}
            hasFeedback>
            <InputNumber placeholder='Account Number'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-96">Confirm Account Number</p>}
            name ="confirm_account_number"
            dependencies={['account_number']}
            hasFeedback
            rules={[{ required:true,message:'please confirm your Account Number'},
                                   ({ getFieldValue }) => ({
                                     validator(value) {
                                        
                                       if (!value || getFieldValue('account_number') === getFieldValue('confirm_account_number')) {
                                         return Promise.resolve();
                                       }
                         
                                       return Promise.reject('The Account Number that you Entered Do Not Match!');
                                     },
                                   }),
                                 ]}>
            <InputNumber placeholder='Confirm your Account Number'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-40">IFSC Code</p>}
            name ="IFSC_code"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='IFSC code'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-96">Adhaar Card Number</p>}
            name ="adhaar_number"
            rules={[{required:true, message: 'required!'}]}>
            <InputNumber placeholder='Adhaar Number'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-40">Pancard Number</p>}
            name ="pancard"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='pancard Number'/>
        </Form.Item>
        </div>
        <div className=" float-right">
            <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">Next</Button>
            </Form.Item>
        </div>
        </Form>
        </div>
    )
}