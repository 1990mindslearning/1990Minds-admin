import { useEffect,useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"
import {Form,Button} from 'antd'
import TextArea from 'antd/lib/input/TextArea';
import moment from 'moment'
import { useHistory } from "react-router-dom";

import { fetchOneLeave, leaveRequestSelector,updateLeave } from "../../../api/leaveRequest";
 

export default function Showleave(){
    const history = useHistory()

    const dispatch = useDispatch()
    const [approve,setApproove] = useState(false)
    const [reject , setReject] = useState(false)  
    const [form] = Form.useForm()
    const {id} = useParams();
    const {current_leave} = useSelector(leaveRequestSelector)
    console.log("In Show Leave",current_leave)

    const onFinish = (values) => {
        if(values.comments === '')
           prompt("Please enter your comments")
        if(approve){
           
          
          const leavedata = {
            aproove : true,
            created:false,
            comments:values.comments,
            
            
          }
          dispatch(updateLeave(current_leave._id, leavedata))
          // alert(notification)
        }
          if(reject){
       
            const leavedata = {
              aproove : false,
              created:false,
              comments:values.comments,
              
      
            }
            dispatch(updateLeave(current_leave._id, leavedata))
          }  
          console.log("Inside show finish",values.comments);             
          form.resetFields()
          history.push(`/dashboard/leaverequest`)
                 
      };
    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };

    useEffect(()=>{
        dispatch(fetchOneLeave(id))
    },[])
    return(
        <div>
             <Form
  // {...layout}
  form={form}

  name="basic"
  initialValues={{ remember: false }}
  onFinish={onFinish}
  onFinishFailed={onFinishFailed}
>

<div className="grid grid-cols-2 gap-5">
<div>    
<h1>Employee Name: {current_leave?.employee?.personal?.full_name}</h1>   
<h1>Leave From: {moment(current_leave?.date_from).format("DD-MM-YYYY")}</h1>
<h1>Leave till: {moment(current_leave?.date_to).format("DD-MM-YYYY")}</h1>
{/* <h1>Number of Days: {moment(current_leave?.date_to).format("DD") - moment(current_leave?.date_from).format("DD")+1}</h1> */}
<h1 className = " text-red-400">Reason:{current_leave?.reason}</h1>

        <Form.Item
          label="Comments"
          name="comments"
          rules={[{ required: true, message: 'Please input your Comments' }]}>
          
          <TextArea  placeholder='please add your comment here..' />

          </Form.Item>        

        <Form.Item wrapperCol={{ span: 30, offset: 6}}>
                <div style={{marginLeft:'30px',padding:'5px',display:'inline-block'}}>
                <Button  type="default" htmlType="submit" onClick={(e)=>current_leave.comments !== ''?setReject(true):""}>Reject</Button>
                </div>
                <Button  type="primary" htmlType="submit" onClick={(e)=>current_leave.comments !== ''?setApproove(true):""}>Approove</Button>
        </Form.Item>
        

        </div>
        </div>
</Form>
        </div>
    )

}