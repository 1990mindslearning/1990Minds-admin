import {Form,Input, Select,Button,Space} from 'antd'
import { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { projectSelector } from '../../../../api/project';
import {clientSelector, fetchAllClient} from '../../../../api/clients'
import {employeeSelector, fetchAllEmployee} from '../../../../api/employee'
import { MinusCircleOutlined,PlusOutlined } from '@ant-design/icons'


export default function ProjectTab({info,actionMethod,data}){

   
    const dispatch = useDispatch();
    const [form] = Form.useForm();
    const [deptartment,setDepartment] = useState(null)
    const [projectMember,setProjectMember] = useState(null)
    const [company,setCompany] = useState(null)
    const {all_client} = useSelector(clientSelector)
    const {all_employee} = useSelector(employeeSelector)
    console.log(all_employee)

    console.log(all_client)


    const {activeTab,project_data} = useSelector(projectSelector)
    useEffect(()=>{
        dispatch(fetchAllClient())
        dispatch(fetchAllEmployee())
    },[])

    const handleSelect =(value)=>{
      console.log(value)
      setCompany(value)
    }
    const handleDepartment = (value)=>{
        console.log(value)
        setDepartment(value)
    }

    const handleProjectMember = (value) =>{
        setProjectMember(value)
        console.log(value)
    }

    const onFinishProject = (values)=>{
        const projectData = {
          project_name:values.project_name,
          department:values.department,
          service_type:values.service_type,
          members:values.members,
          company:values.company,
          
        }
        dispatch(info(projectData))
        dispatch(actionMethod())
        console.log(activeTab)

        console.log(project_data)

    }
    useEffect(()=>{
        form.setFieldsValue({
            project_name:data?.project_name,
            department:data?.department,
            service_type:data?.service_type,
            company:data?.company,
            members:data?.members,

        })

    },[data])
    return(
        <div>
            <Form onFinish={onFinishProject}
                  name='project'
                  form = {form}
                  labelCol={{span: 24}}
                  wrapperCol={{span:24}}
                  initialValues={{remember:true}}>
                <div className=' grid grid-cols-2 gap-4 ml-7'>
                <div>
                  <Form.Item
                       label ={<p className=" text-left m-0 w-32">Project Name</p>}
                       name = "project_name"
                       rules = {[{required:true,message:'required'}]}>
                    <Input placeholder='Project Name'/>   
                  </Form.Item>
                  <Form.Item
                       label ={<p className=" text-left m-0 w-40">Company Name</p>}
                       name = "company"
                       rules = {[{required:true,message:'required'}]}>
                      
                
                    <Select
                        placeholder="Select the Company Name"
                        onChange= {handleSelect}
                        filterOption={(input, option) =>
                                    option.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        {
                            all_client.map((item)=>{
                              
                                return <option key = {item._id} value={item._id}>{item.company_name}</option>
                            })
                        }   
                  </Select>
                  {/* <Form.Item
                       label ={<p className=" text-left m-0 w-32">Company Logo</p>}
                       name = "company_logo"
                       >
                        {
                            all_client.map((item)=>{
                                return <option key= {item._id} value={item.company_logo}>{item.company_logo}</option>
                            })
                        }  
                  </Form.Item> */}
                  </Form.Item>
                  <Form.Item
                       label ={<p className=" text-left m-0 w-40">Department</p>}
                       name='department'
                       rules = {[{required:true,message:'required'}]}
                       >
                    <Select placeholder='Select the department'
                            onChange = {handleDepartment}>
                        <option key='1' value="Design">Design</option>
                        <option key='2' value="Development">Development</option>
                    </Select>
                  </Form.Item>
                  {
                    deptartment === 'Design'?<Form.Item
                       label ={<p className=" text-left m-0 w-40">Service Type</p>}
                       name='service_type'
                       rules = {[{required:true,message:'required'}]}>
                    <Select placeholder='Select the department'>
                        <option key='1' value="Logo">Logo</option>
                        <option key='2' value="Brochure">Brochure</option>
                        <option key='3' value="Social media post">Social Media Post</option>
                        <option key='4' value="Flyer">Flyer</option>
                        <option key='5' value="Package Design">Package Design</option>
                        <option key='6' value="Catalogue">Catalogue</option>



                    </Select>
                  </Form.Item>:<Form.Item
                       label ={<p className=" text-left m-0 w-40">Service Type</p>}
                       name='service_type'
                       rules = {[{required:true,message:'required'}]}>
                    <Select placeholder='Select the department'>
                        <option key='1' value="Website">Website</option>
                        <option key='2' value="WebApp">WebApp</option>
                    </Select>
                  </Form.Item>
                  }   
                  </div>
                  <div className=' ml-6'>
                    <Form.List 
                     labelCol={{span: 24}}
                   wrapperCol={{span:24}}
                     name="members">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }) => (
              <Space
                key={key}
                style={{
                  marginBottom: 8,
                }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, 'member_name']}
                  rules={[
                    {
                      required: true,
                      message: 'Missing Project Member name',
                    },
                  ]}
                >
                <Select
                        placeholder="Select the Project Member"
                        onChange= {handleProjectMember}
                        filterOption={(input, option) =>
                                    option.toLowerCase().indexOf(input.toLowerCase()) >= 0}>
                        {
                            all_employee.map((item)=>{
                                return <option key = {item._id} value={item.personal?.full_name}>{item.personal?.full_name}</option>
                            })
                        }   
                  </Select>
                 
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, 'member_role']}
                  rules={[
                    {
                      required: true,
                      message: 'required',
                    },
                  ]}
                >
                <Input placeholder={`Role assigned to ${projectMember}`}/>
                  
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                Add Project Member
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <Form.Item wrapperCol={{ span: 20, offset: 9}}>
          <Button type="primary" htmlType="submit">
           Next
          </Button>
        </Form.Item>
                    </div>
                  </div>
           

            </Form>
        </div>
    )
}