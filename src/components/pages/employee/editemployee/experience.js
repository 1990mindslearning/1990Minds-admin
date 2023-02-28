import {DatePicker, Form,Input,Button} from 'antd';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import moment from 'moment'

export default function Experience({actionMethod,info,data}){
    const [form] = Form.useForm();
    const dispatch = useDispatch()

    const onFinishExperience = (values)=>{
        const experiencedata = {
            experience:{

                company_name:values.company_name,
                company_department:values.company_department,
                company_designation:values.company_designation,
                company_experience:values.company_experience,
                work_location:values.work_location,
                work_from:moment(values.work_from).format(),
                work_to:moment(values.work_to).format(),
           },
        }
        dispatch(actionMethod())
        dispatch(info(experiencedata))

    }
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

      useEffect(()=>{
        form.setFieldsValue({
            company_name:data?.experience?.company_name,
            company_department:data?.experience?.company_department,
            company_designation:data?.experience?.company_designation,
            company_experience:data?.experience?.company_experience,
            work_location:data?.experience?.work_location,
            work_from:moment(data?.experience?.work_from),
            work_to:moment(data?.experience?.work_to),

        },[])
      })
    return(
        <div className="mt-5 mx-5">
        <Form onFinish={onFinishExperience}
              name = 'experience'
              form = {form}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              initialValues={{remember:true}}
              onFinishFailed={onFinishFailed}>
        <div className="grid grid-cols-2 gap-4">
        <div>
        <Form.Item
            label={<p className=" text-left m-0 w-42">Company Name</p>}
            name ="company_name">
            <Input placeholder='Company Name'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-42">Department</p>}
            name ="company_department">
            <Input placeholder='Department of Work'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-42">Designation</p>}
            name ="company_designation">
            <Input placeholder='Designation'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-42">Experience</p>}
            name ="company_experience">
        <Input placeholder='Experience'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-42">Work Location</p>}
            name ="work_location">
        <Input placeholder='Work Location'/>
        </Form.Item>
        <h1>Work period</h1>
        <div className=' grid grid-cols-2 gap-3'>
        <Form.Item
            label={<p className=" text-left m-0 w-42">From</p>}
            name ="work_from">
        <DatePicker picker='date' placeholder='Worked from'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-42">To</p>}
            name ="work_to">
        <DatePicker picker='date' placeholder='Worked till'/>
        </Form.Item>

        </div>
        <Form.Item className="text-right">
            <Button type="primary" htmlType="submit">Next</Button>
        </Form.Item>
        </div>
        </div>
        </Form>
        </div>
    )
}