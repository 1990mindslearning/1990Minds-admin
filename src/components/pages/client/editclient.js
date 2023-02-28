import {Input,InputNumber,Button, Form,Upload,Row,Col,Image }from 'antd'
import { PlusOutlined,LoadingOutlined } from '@ant-design/icons';
import {clientSelector, createClient,updateClient, fetchOneClient} from '../../../api/clients'
import { useDispatch, useSelector } from 'react-redux';
import { useState,useEffect } from 'react';
import storage from '../../shared/storage'
import Loader from '../../shared/loader';
import {MdClose, MdDelete} from 'react-icons/md'
import { useHistory, useParams } from 'react-router-dom';
import { useForm } from 'antd/lib/form/Form';
import styled from 'styled-components'


export default function ClientEdit(){
   const history = useHistory()
    const dispatch = useDispatch();
    const [form] = Form.useForm();

    const {id} = useParams();

    const [imgurl,setImgurl] = useState([])
    const [loading,setLoading] = useState(false)
    const {current_client} = useSelector(clientSelector)
    console.log("Client is",current_client?.last_name)

    

    useEffect(()=>{
        dispatch(fetchOneClient(id))   
        
    },[dispatch])


    useEffect(()=>{
      setImgurl([current_client?.company_logo])
        form.setFieldsValue({
            first_name:current_client?.first_name,
            last_name:current_client?.last_name,
            company_name:current_client?.company_name,
            designation:current_client?.designation,
            phone_number:current_client?.phone_number,
            email:current_client?.email,
            address:current_client?.address,
            GSTIN:current_client?.GSTIN,
            company_PAN:current_client?.company_PAN,
            username:current_client?.username,
            password:current_client?.password,
            company_logo:imgurl[0]

        })
    
    },[current_client])

    
    const handleChange = info => {
      setLoading(true)
         
          storage
          .ref("images/" + info.file.name)
          .put(info.file.originFileObj)
          .then(snapshot => {
            return snapshot.ref.getDownloadURL();
          })
          .then(url => {
            console.log(url);
            setImgurl([...imgurl, url])
            setLoading(false)
      
          })
          .catch(error => {
            console.log(error);
          });
      
        };
        const remove = (e, url) =>{

         setImgurl(prev => prev.filter(item => item !== url))
         
         }


   
         const uploadButton = (
            
            <div>
              { loading ? <LoadingOutlined  /> : <PlusOutlined />}
              <div style={{ marginTop: 8, fontSize:"14px" }}>{loading ? "uploading" :""}</div>
            </div>
          );

          const onFinishClient= (values)=>{
            // console.log(imgurl[0])
              const clientData = {
                  first_name:values.first_name,
                  last_name:values.last_name,
                  company_name:values.company_name,
                  designation:values.designation,
                  phone_number:values.phone_number,
                  email:values.email,
                  address:values.address,
                  GSTIN:values.GSTIN,
                  company_PAN:values.company_PAN,
                  username:values.username,
                  password:values.password,
                  company_logo:imgurl[0],
      
              }
              dispatch(updateClient(current_client._id,clientData))
             history.goBack()


          }
    return(
        <FormWrap>
        <div className=''>
        
             <Form onFinish={onFinishClient}
                   form = {form}
                   initialValues={{remember:true}}
                   labelCol={{ span: 24 }}
                   wrapperCol={{ span: 24 }}>
                  <div className="grid grid-cols-3 gap-4">

             <Form.Item
               label="First Name"
               name="first_name">
            <Input/>
         </Form.Item>
         <Form.Item
               label="Last Name"
               name="last_name">              
            <Input/>
         </Form.Item>
             <Form.Item
               label="Company Name"
               name="company_name"
               rules={[{ required: true, message: 'required!' }]}
               >
            <Input/>
         </Form.Item>
        <Form.Item
               label="Designation"
               name="designation">
            <Input/>
         </Form.Item>
         <Form.Item
               label="Phone Number"
               name="phone_number">
            <InputNumber/>
         </Form.Item>
         <Form.Item
               label="Email"
               name="email">
            <Input/>
         </Form.Item>
         <Form.Item
               label="Address"
               name="address">
            <Input/>
         </Form.Item>
         <Form.Item
               label="GSTIN"
               name="GSTIN">
            <Input/>
         </Form.Item>
         <Form.Item
               label="Company PAN"
               name="company_PAN">
            <Input/>
         </Form.Item>
         <Form.Item
               label="Password"
               name="password">
            <Input/>
         </Form.Item>



         <Form.Item
            label={<p className="text-left m-0 ml-2 ">Image</p>}
            name="image"
          
          >
                <div 
                    className=" grid grid-cols-4 gap-5">
                {

                imgurl.map((img, i)=>{

                  return <div className=" imglist  bg-gray-50 text-center" style={{height:"100px"}}>
                   
                  <Image    
                   preview={false}               
                   key={i}
                   className="  rounded col-span-1  block  object-cover"
                   style={{height:"100%", width:"100%"}}
                   src={img}
                   placeholder={<Loader/> }              
                 />   
                  <h2 onClick={(e)=>remove(e, img)} className="p-1 text-white  text-xl "> <MdDelete/></h2> 

                    </div>
                })
                }

                <Upload       
                        listType="picture-card"
                       
                        onChange={handleChange}
                        multiple={true}
                        className="ml-2"
                        >
                        {imgurl.length >= 1 ? null : uploadButton}
                        </Upload>
                </div> 


        </Form.Item>
         <Form.Item>
                   <Button className=' mt-20' type="primary" htmlType='submit'>Save</Button>
            </Form.Item>
             </div>
             </Form>
        </div>
        </FormWrap>
    )
}

const FormWrap = styled.div`

position: relative;


.imglist {
overflow: hidden;

h2 { opacity : 0;
display:none;
position: absolute;
margin: 0;
bottom: 0%;
background-color: rgba(0,0,0,0.5);
cursor: pointer;
transition: 0.1s;

&:hover {

font-size: 1.5rem;
}

}

&:hover h2 {

opacity : 1;
display:block
}
}

`