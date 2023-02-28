import {Form,InputNumber,Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {employeeSelector,createemployee} from '../../../../api/employee'
import {useHistory} from 'react-router-dom'

export default function Salary({info,actionMethod}){
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const history=useHistory()

    const {employee_data,login_data,personal_data,education_data,experience_data,bank_data} = useSelector(employeeSelector)
   
    const onfinishSalary =(values)=>{

        console.log(employee_data)
        const salarydata={

            employee:employee_data.employee,
             
            personal:personal_data.personal,
            education:education_data.education,
            experience:experience_data.experience,
            bank:bank_data.bank,


            salary:{
                basic:values.basic,
                da:values.da,
                hra:values.hra,
                conveyance:values.conveyance,
                professional_tax:values.professional_tax, 

 
           },
           office_email:employee_data.office_email,
           password:login_data.password,
           email:employee_data.office_email,
           confirm_password:login_data.confirm_password,

        }
  
        console.log("All data is,",salarydata)
        dispatch(actionMethod())
        dispatch(info(salarydata))
        dispatch(createemployee(salarydata))
        history.push('/dashboard/employee')     


    }
    return(
        <div className="mt-5 mx-5">
        <Form onFinish = {onfinishSalary}
              name ='salary'
              form = {form}
              labelCol={{span: 24}}
              wrapperCol={{span : 24}}
              initialValues={{remember:true}}>
        <div className="grid grid-cols-3 gap-4">
        <Form.Item
            label={<p className=" text-left m-0 w-40">Basic Salary</p>}
            name ="basic"
            rules={[{required:true, message: 'required!'}]}>
            <InputNumber placeholder='Basic Salary'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-96">Dearness Allowance</p>}
            name ="da"
            rules={[{required:true, message: 'required!'}]}>
            <InputNumber placeholder='Dearness Allowance'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-96">House Rent Allowance</p>}
            name ="hra"
            rules={[{required:true, message: 'required!'}]}>
            <InputNumber placeholder='House Rent Allowance'/>
        </Form.Item>

        <Form.Item
            label={<p className=" text-left m-0 w-96">Conveyance</p>}
            name ="conveyance"
            rules={[{required:true, message: 'required!'}]}>
            <InputNumber placeholder='Conveyance'/>
        </Form.Item>
        <Form.Item
            label={<p className=" text-left m-0 w-96">Professional Tax</p>}
            name ="professional_tax"
            rules={[{required:true, message: 'required!'}]}>
            <InputNumber placeholder='Professional Tax'/>
        </Form.Item>
        



        </div>
            <div className=' float-right'>
            <Form.Item>
            <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item>
            </div>
        </Form>

  

        </div>
    )
}