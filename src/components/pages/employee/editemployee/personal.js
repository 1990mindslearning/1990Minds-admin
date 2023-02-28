import {Form,Input, Select,DatePicker,InputNumber,Button} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment'
import { employeeSelector } from '../../../../api/employee';


export default function Personal({data,actionMethod,info}){
    
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const {employee_data} = useSelector(employeeSelector)

    const onfinishPersonal = (values)=>{
        const personaldata ={
            personal:{
                full_name: employee_data?.employee.first_name+" "+employee_data?.employee.last_name,

                dob:moment(values.dob).format(),
                father_name:values.father_name,
                mother_name:values.mother_name,
                marital_status:values.marital_status,
                father_occupation:values.father_occupation,
                birth_place:values.birth_place,
                city:values.city,
                pincode:values.pincode,
                state:values.state, 
                p_city:values.p_city,
                p_pincode:values.p_pincode,
                p_state:values.p_state,
           },

        }
        dispatch(actionMethod())
        dispatch(info(personaldata))
        console.log("Emp Details is:",employee_data)
        
    }

    useEffect(()=>{
        form.setFieldsValue({
            full_name:data?.personal?.full_name,
            father_name:data?.personal?.father_name,
            mother_name:data?.personal?.mother_name,
            dob:moment(data?.personal?.dob),
            phone_number:data?.employee?.phone_number,
            present_address:data?.employee?.present_address,
            city:data?.personal?.city,
            pincode:data?.personal?.pincode,
            state:data?.personal?.state,
            p_city:data?.personal?.p_city,
            p_pincode:data?.personal?.p_pincode,
            p_state:data?.personal?.p_state,
            permanent_address:data?.employee?.permanent_address,
            personal_email:data?.employee?.personal_email,
            birth_place:data?.personal?.birth_place,
            nationality:data?.employee?.nationality,
            father_occupation:data?.personal?.father_occupation,
            marital_status:data?.personal?.marital_status,
        })

    },[])
    return(
        <div className="mt-5 mx-5">
        <Form onFinish = {onfinishPersonal}
              name ='personal'
              form = {form}
              labelCol={{span: 24}}
              wrapperCol={{span : 24}}
              initialValues={{remember:true}}>
        <div className="grid grid-cols-2 gap-4">
        <div>
        <Form.Item
            label={<p className=" text-left m-0 w-32">Full Name</p>}
            name ="full_name">
            <Input placeholder='Full Name'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-32">Father's Name</p>}
            name ="father_name"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='Father Name'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-32">Mother's Name</p>}
            name ="mother_name"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='Mother Name'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-32">Date of Birth</p>}
            name ="dob">
            <DatePicker picker='date' placeholder='DOB'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-32">Phone Number</p>}
            name ="phone_number">
            <InputNumber placeholder='Phone Number'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-48">Present Address</p>}
            name ="present_address"
            rules={[{required:true, message: 'required!'}]}>
            <TextArea placeholder='Present address'/>
        </Form.Item>
        <div className=' grid grid-cols-2 gap-4'>
        <Form.Item
            label={<p className=" text-left m-0 w-32">City</p>}
            name ="p_city"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='Present City'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-32">Pincode</p>}
            name ="p_pincode"
            rules={[{required:true, message: 'required!'}]}>
            <InputNumber placeholder='Present City Pincode'/>
        </Form.Item>
        </div>
        <Form.Item
            label={<p className=" text-left m-0 w-32">State</p>}
            name ="p_state"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='Present State you live in!'/>
        </Form.Item>
        </div>
        <div>
        <Form.Item
            label={<p className=" text-left m-0 w-32">Marital Status</p>}
            name ="marital_status"
            rules={[{required:true, message: 'required!'}]}>
             <Select placeholder='Marital Status'
                     showSearch>
                <option key="1" value = "Single">Single</option>
                <option key="2" value = "Married">Married</option>             
             </Select>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-96">Father's Occupation</p>}
            name ="father_occupation"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='Father Occupation'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-32">Nationality</p>}
            name ="nationality"
           >
            <Input placeholder='Nationality'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-32">Birth Place</p>}
            name ="birth_place"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='Birth Place'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-32">Personal Email</p>}
            name ="personal_email">
            <Input placeholder='Personal Email'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-96">Parmanent Address</p>}
            name ="permanent_address"
            rules={[{required:true, message: 'required!'}]}>
            <TextArea placeholder='Permanent address'/>
        </Form.Item>
        <div className=' grid grid-cols-2 gap-4'>
        <Form.Item
            label={<p className=" text-left m-0 w-32">City</p>}
            name ="city"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='Present City'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-32">Pincode</p>}
            name ="pincode"
            rules={[{required:true, message: 'required!'}]}>
            <InputNumber placeholder='Present City Pincode'/>
        </Form.Item>
        </div>
        <div>
        <Form.Item
            label={<p className=" text-left m-0 w-32">State</p>}
            name ="state"
            rules={[{required:true, message: 'required!'}]}>
            <Input placeholder='Permanent State'/>
        </Form.Item>
        </div>
        </div>
        </div>
        <div className="mt-4 float-right">
            <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">Next</Button>
            </Form.Item>
        </div>
        </Form>

        </div>

    )
}