import {Tabs} from 'antd'
import Project from './project'
import ProjectForm from './projectform'
import Attachment from './attachment'
import {projectSelector,CreateProject,CreateAttachments,getproject,getprojectForm,getattachments,projectInfo,projectFormInfo,attachmentsInfo,getAll_Project_Success,getCurrentSuccess, CreateProjectForm, getprojectInfo, getProjectFormInfo, getAttachmentInfo, fetchOneProject} from '../../../../api/project'
import { useDispatch,useSelector } from 'react-redux'
import { useEffect } from 'react'
import { useParams } from 'react-router-dom'


const {TabPane} = Tabs
export default function EditProject({data}){
    const {id} = useParams()

    const dispatch = useDispatch();
    const {activeTab,projectform,attachments,current_project} = useSelector(projectSelector)
    console.log(current_project)

    useEffect(()=>{
        dispatch(fetchOneProject(id))
    },[])
    const ontab = (k, e) =>{
        e.preventDefault();
        console.log("Key is:",k)
          if(k === "2"){
              dispatch(CreateProjectForm());      
          } else if(k === "3"){       
            dispatch(CreateAttachments());
          }else if(k === "1"){
            dispatch(CreateProject())
          }          
        }

    return(
        <div>
        
            <Tabs activeKey={activeTab} onTabClick={(k, e)=>ontab(k, e)}>
            <TabPane tab = "Project" key = "1">
            <Project info={getprojectInfo} actionMethod = { CreateProjectForm } data={current_project} />
            </TabPane>
            <TabPane tab = "Project Form" key="2" disabled = {projectform?false:true} >
            <ProjectForm info={getProjectFormInfo} actionMethod = {CreateAttachments} data={current_project}/>
            </TabPane>
            <TabPane tab = "Attachments" key="3" disabled = {attachments?false:true} ><Attachment info={getAttachmentInfo} data={current_project}/></TabPane>
            </Tabs>
        </div>
    )
}