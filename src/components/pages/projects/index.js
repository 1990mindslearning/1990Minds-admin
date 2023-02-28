import { Button ,Select} from "antd"
import {PlusOutlined} from '@ant-design/icons'
import {Link,useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux"
import { useEffect,useState } from "react";
import { fetchAllProject, projectSelector } from "../../../api/project";
 
import ProjectTable from './project-table'
import Loader from '../../shared/loader'
import axios from 'axios'
import { keyUri, config } from '../../../key'


export default function ProjectHome(){
    const dispatch = useDispatch();
    const {loading,all_projects} = useSelector(projectSelector)
  
    let history = useHistory()
     

    const [filter,setFilter] = useState(null)
    const [load,setLoad] = useState(false)

    const filterStatus = (value)=>{
         
        setLoad(true)
        axios.get(keyUri.BACKEND_URI +`/project?filter=${value}`).then(({data})=>{
        setFilter(data.project) 
        console.log(filter)
        })
    }
 

    useEffect(()=>{
      
        dispatch(fetchAllProject())
     
    },[dispatch])
    return (
        <div>
         <div className=' float-right'>

<Select className=' w-40' placeholder='Filter the project type' onChange={filterStatus}>
<option key = "1" value = "Design">Design</option>
<option key = "2" value = "Development">Development</option>

</Select>
</div>
        <Link to = "/dashboard/create-project">
            <Button type = "primary" onClick={console.log("Clicked")} icon={<PlusOutlined/>}>Add Projects</Button>
        </Link>
        {
            loading ?<Loader/> : <ProjectTable data = {filter}/>
        }
        </div>
    )
}