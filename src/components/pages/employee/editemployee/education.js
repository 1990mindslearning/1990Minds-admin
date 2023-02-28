import {Form,Input, Select,DatePicker,InputNumber,Button, Collapse} from 'antd';
import moment from 'moment'
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
const {Panel} = Collapse

export default function Education({actionMethod,info,data}){
    const dispatch = useDispatch();
    const [form] = Form.useForm()

    const onfinishEducation = (values)=>{
         
        
        const educationdata ={
            education:{
                high_school:{
                     hs_institute_name:values.hs_institute_name,
                     hs_board_name:values.hs_board_name,
                     hs_from:moment(values.hs_from).format(),
                     hs_to:moment(values.hs_to).format(),
                     hs_percentage:values.hs_percentage,
                     
                },
                intermediate:{
                     i_institute_name:values.i_institute_name,
                     i_board_name:values.i_board_name,
                     i_specialisation:values.i_specialisation,
                     i_from:moment(values.i_from).format(),
                     i_to:moment(values.i_to).format(),
                     i_percentage:values.i_percentage,
 
                },
                bachelors:{
                     b_institute_name:values.b_institute_name,
                     b_board_name:values.b_board_name,
                     b_specialisation:values.b_specialisation,
                     b_from:moment(values.b_from).format(),
                     b_to:moment(values.b_to).format(),
                     b_percentage:values.b_percentage,
 
                },
 
           },
        }
        console.log(educationdata)
        dispatch(actionMethod())
        dispatch(info(educationdata))
    }

    useEffect(()=>{
        form.setFieldsValue({
            hs_institute_name:data?.education?.high_school?.hs_institute_name,
            hs_board_name:data?.education?.high_school?.hs_board_name,
            hs_from:moment(data?.education?.high_school?.hs_from),
            hs_to:moment(data?.education?.high_school?.hs_to),
            hs_percentage:data?.education?.high_school?.hs_percentage,

            i_institute_name:data?.education?.intermediate?.i_institute_name,
            i_board_name:data?.education?.intermediate?.i_board_name,
            i_specialisation:data?.education?.intermediate?.i_specialisation,
            i_to:moment(data?.education?.intermediate?.i_to),
            i_from:moment(data?.education?.intermediate?.i_from),
            i_percentage:data?.education?.intermediate?.i_percentage,

            b_institute_name:data?.education?.bachelors?.b_institute_name,
            b_board_name:data?.education?.bachelors?.b_board_name,
            b_specialisation:data?.education?.bachelors?.b_specialisation,
            b_to:moment(data?.education?.bachelors?.b_to),
            b_from :moment(data?.education?.bachelors?.b_from),
            b_percentage:data?.education?.bachelors?.b_percentage,
            




        })
    },[])
    return(
    <div className="mt-5 mx-5">
    <Form onFinish = {onfinishEducation}
          name ='education'
          form = {form}
          labelCol={{span: 24}}
          wrapperCol={{span : 24}}
          initialValues={{remember:true}}>
    <div className="grid gap-4">
    <Collapse>
    <Panel header="High School" key = "1">
    <div className=' grid grid-cols-2 gap-3'>
    <Form.Item
        label="Institute Name"
        name="hs_institute_name"
        rules={[{ required: true, message: 'required'}]}>
        <Input placeholder='High school name'/>
    </Form.Item>
    <Form.Item
        label="Name of the board"
        name="hs_board_name"
        rules={[{ required: true, message: 'required'}]}>
        <Input placeholder='High school board'/>
    </Form.Item>
    </div>

    <h1>Year of Studying</h1>
    <div className=' grid grid-cols-3 gap-3'>
    <Form.Item
        label="From"
        name="hs_from"
        rules={[{ required: true, message: 'required'}]}>
        <DatePicker picker='year' placeholder='Studied from'/>
    </Form.Item>
    <Form.Item
        label="To"
        name="hs_to"
        rules={[{ required: true, message: 'required'}]}>
        <DatePicker picker='year' placeholder='Studied till..'/>
    </Form.Item>
    <Form.Item
        label="Percentage"
        name="hs_percentage"
        rules={[{ required: true, message: 'required'}]}>
        <Input placeholder='High school percentage'/>
    </Form.Item>
    </div>
    </Panel>
    <Panel header="Intermediate" key = "2">
    <div className=' grid grid-cols-3 gap-2'>
    <Form.Item
        label="Institute Name"
        name="i_institute_name"
        rules={[{ required: true, message: 'required'}]}>
        <Input placeholder='College name'/>
    </Form.Item>
    <Form.Item
        label="Name of the board"
        name="i_board_name"
        rules={[{ required: true, message: 'required'}]}>
        <Input placeholder='College board'/>
    </Form.Item>
    <Form.Item
        label="Specialisation"
        name="i_specialisation"
        rules={[{ required: true, message: 'required'}]}>
        <Input placeholder='Specialisation in'/>
    </Form.Item>
    </div>
    <h1>Year of Studying</h1>
    <div className=' grid grid-cols-3 gap-3'>
    <Form.Item
        label="From"
        name="i_from"
        rules={[{ required: true, message: 'required'}]}>
        <DatePicker picker='year' placeholder='Studied from'/>
    </Form.Item>
    <Form.Item
        label="To"
        name="i_to"
        rules={[{ required: true, message: 'required'}]}>
        <DatePicker picker='year' placeholder='Studied till..'/>
    </Form.Item>
    <Form.Item
        label="Percentage"
        name="i_percentage"
        rules={[{ required: true, message: 'required'}]}>
        <Input placeholder='Intermediate percentage'/>
    </Form.Item>
    </div>
    </Panel>
    <Panel header="Bachelors" key = "3">
    <div className=' grid grid-cols-3 gap-3'>
    <Form.Item
        label="Institute Name"
        name="b_institute_name"
        rules={[{ required: true, message: 'required'}]}>
        <Input placeholder='Institute name'/>
    </Form.Item>
    <Form.Item
        label="Name of the board"
        name="b_board_name"
        rules={[{ required: true, message: 'required'}]}>
        <Input placeholder='University Board'/>
    </Form.Item>
    <Form.Item
        label="Specialisation"
        name="b_specialisation"
        rules={[{ required: true, message: 'required'}]}>
        <Input placeholder='Specialisation in'/>
    </Form.Item>
    </div>
    <h1>Year of Studying</h1>
    <div className=' grid grid-cols-3 gap-3'>
    <Form.Item
        label="From"
        name="b_from"
        rules={[{ required: true, message: 'required'}]}>
        <DatePicker picker='year' placeholder='Studied from'/>
    </Form.Item>
    <Form.Item
        label="To"
        name="b_to"
        rules={[{ required: true, message: 'required'}]}>
        <DatePicker picker='year' placeholder='Studied till..'/>
    </Form.Item>
    <Form.Item
        label="Percentage"
        name="b_percentage"
        rules={[{ required: true, message: 'required'}]}>
        <Input placeholder='Bachelors percentage'/>
    </Form.Item>
    </div>
    </Panel>
    </Collapse>  
   </div>
    <div className="mt-4 float-right">
        <Form.Item className="text-right">
        <Button type="primary" htmlType="submit">Next</Button>
        </Form.Item>
    </div>
    </Form>
    </div>)
}