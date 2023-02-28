import { useEffect,useState } from 'react';
import {Card, Form,Input,Space,Select,Button} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import {useParams,  useLocation} from 'react-router-dom'
import { fetchOneProject, projectSelector } from '../../../api/project';
import { MinusCircleOutlined,PlusOutlined } from '@ant-design/icons'
import { employeeSelector, fetchAllEmployee } from '../../../api/employee';



export default function ShowProject(){
    const [form] = Form.useForm()
    const {id} = useParams();
    const dispatch = useDispatch()
    const {current_project} = useSelector(projectSelector)
    const {all_employee} = useSelector(employeeSelector)
    const [projectMember,setProjectMember] = useState(null)

    const handleProjectMember = (value) =>{
        setProjectMember(value)
        console.log(value)
    }
    useEffect(()=>{
        dispatch(fetchOneProject(id))
        dispatch(fetchAllEmployee())

    },[])
    useEffect(()=>{
        form.setFieldsValue({
            project_name:current_project?.project_name,
            service_type:current_project?.service_type
        })
    },[current_project])
    console.log(current_project)



    return(<div>
                <h1>Hello</h1>
                <div className=' grid grid-cols-2 gap-4'>
                 <Card bordered = {true}
                       hoverable= {true}>
                       
                       <p>Project Name:<span>{current_project?.project_name}</span></p>
                       <p>Service Type:<span>{current_project?.service_type}</span></p>              
                     
                 </Card>
                 <Card bordered = {true}
                       hoverable = {true}>
                       <h1>Members:</h1>
                                         
                  {
                    current_project?.members?.map((item)=>{
                        console.log(item?.member_role)
                        console.log(item?.member_name)
                        return <div><p>{item?.member_name}: {item?.member_role}</p></div>

                    })
                  }
         
                    

                 </Card>
                 <Card hoverable= {true}
                       bordered = {true}>
                    {
                        current_project?.attachements?.map((item)=>{
                            return <p>{item}</p>
                        })
                    }
                    
                 </Card>
                </div>
              

               
           </div>)
}