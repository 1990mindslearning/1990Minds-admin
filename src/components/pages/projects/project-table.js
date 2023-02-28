import {Card,Select} from 'antd'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { fetchAllProject, projectSelector } from '../../../api/project'
import axios from 'axios'
import { keyUri, config } from '../../../key'
import { useHistory } from 'react-router-dom'
import { EditOutlined } from '@ant-design/icons'
const {Meta} = Card


export default function ProjectTable({data}){

    let history = useHistory()
     
    console.log("THe projects are:",data)
    const [filter,setFilter] = useState(null)
    const [load,setLoad] = useState(false)

    // const filterStatus = (value)=>{
         
    //     setLoad(true)
    //     axios.get(keyUri.BACKEND_URI +`/project?filter=${value}`).then(({data})=>{
    //     setFilter(data.project) 
    //     console.log(filter)
    //     })
    // }

    useEffect(()=>{
        fetchAllProject()
    },[])

 
    return(
        <div className=' p-4 grid grid-cols-4  gap-2'>
        {/* <div className=' float-right'>

        <Select className=' w-40' placeholder='Filter the project type' onChange={filterStatus}>
        <option key = "1" value = "Design">Design</option>
        <option key = "2" value = "Development">Development</option>

        </Select>
        </div> */}
    

 
        {
            data?.map((item)=>{
                return(
                    <div className=' mb-4'>
                    <Card hoverable= {true}
                          className=" flex flex-col items-center content-center"
                          style={{width:200,height:180}}
                          onClick = {(e)=>history.push(`/dashboard/showProject/${item._id}`)}
                          cover={<img style ={{marginTop:'8px',padding:'10px',borderRadius:'12px',width:'90px',height:'80px'}} alt ="comapany_logo" src = {item.company?.company_logo}/>}>
                          <Meta
                              description = {<div><h5 className=' border-b-2 text-purple-400'>{item.project_name}</h5><h6 className=' text-xs text-center'>{item.company?.company_name}</h6></div>}/>
                    </Card> 
                        <EditOutlined className=' float-right' onClick={(e)=>history.push(`/dashboard/edit-project/${item._id}`)}/>
                    </div>
                        
                )
            })
        }
        </div>
    
    )
}