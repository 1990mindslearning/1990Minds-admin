import { Button, Upload,Form,Icon } from "antd";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { projectSelector,createProject } from "../../../api/project";
import storage from "../../shared/storage";



export default function Attachements({info}){
    const history = useHistory()

    const dispatch = useDispatch();
    const {project_data,project_form_data} = useSelector(projectSelector)

    const [imgurl,setImgurl] = useState([])
    const [loading,setLoading] = useState(false)


    const uploadFile = (value)=>{
        console.log("The complete object is",value)
          

        
        let newfileList = [...value.fileList]
        newfileList = newfileList.map((item)=>{
            console.log(item)
            setLoading(true)
            storage
            .ref("images/" + item.name)
            .put(item.originFileObj)
            .then(snapshot => {
                return snapshot.ref.getDownloadURL();
            })
        
            .then(url => {
                console.log(url);
                setImgurl([...imgurl, url])
                console.log("ImgUrl is",imgurl)                
            })
            .catch(error => {
                console.log("error in code")
                console.log({error});
            });
           
           
        })
        
        
    }
    console.log(imgurl)
    
    const onFinishProject = (value) => {
        
        
        // console.log("The complete object is",value)
        
        // console.log("Array of files",value.attachements.fileList)
        // value.attachements.fileList.map((item)=>{
        //     setLoading(true)
        //     storage
        //     .ref("images/" + item.name)
        //     .put(item.name.originFileObj)
        //     .then(snapshot => {
        //         return snapshot.ref.getDownloadURL();
        //     })
        //     .then(url => {
        //         console.log(url);
        //         setImgurl([...imgurl, url])
        //         setLoading(false)
                
        //     })
        //     .catch(error => {
        //         console.log(error);
        //     });
        // })
        console.log("Tab1 info is",project_data)
        console.log("Tab 2 info is",project_form_data)
        console.log("Current Tab info is",imgurl)

        const finishData={
            // company_name:project_data?.company_name,
            department:project_data?.department,
            members:project_data?.members,
            project_name:project_data?.project_name,
            service_type:project_data?.service_type,
            company:project_data?.company,
            attachements:imgurl,
            logo:project_data?.service_type === 'Logo'? project_form_data:null,
            brochure:project_data?.service_type === 'Brochure'? project_form_data:null,
            flyer:project_data?.service_type === 'Flyer'?project_form_data:null,
            catalogue:project_data?.service_type === 'Catalogue'?project_form_data:null, 
            package_design:project_data?.service_type === 'Package Design'?project_form_data:null,
            social_media:project_data?.service_type === 'Social media post'?project_form_data:null,
            website:project_data?.service_type === 'Website'?project_form_data:null,

        }

        console.log(finishData)
        dispatch(info(finishData))
        dispatch(createProject(finishData))
        history.push('/dashboard/projects')
        //   const remove = (e, url) =>{
  
        //    setImgurl(prev => prev.filter(item => item !== url))
           
           }

    return(
    
             <Form onFinish={onFinishProject}
                   labelCol={{ span: 24 }}
                   wrapperCol={{ span: 24 }}>

          <Form.Item
            label={<p className="text-left m-0 ml-2 ">Attachements</p>}
            name="attachements"
         
          >
            <Upload multiple                       
                            accept=".png,.jpeg,.pdf"
                            onChange={(file)=>uploadFile(file)}>
                
                <Button >Upload the files here</Button>
            </Upload>
            
            </Form.Item>
            <Form.Item>
                   <Button className=' mt-20' type="primary" htmlType='submit'>Save</Button>
            </Form.Item>
        </Form>
      
    )
}