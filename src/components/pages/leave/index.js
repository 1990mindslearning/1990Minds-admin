import { useEffect ,useState} from 'react'
import {PlusOutlined} from '@ant-design/icons'
import { Tabs, Button, Input } from 'antd';
import {useDispatch, useSelector} from 'react-redux' 
import { fetchEmployeeLeave, leaveRequestSelector,fetchAllLeave } from '../../../api/leaveRequest'
import ModalForm from '../../shared/modal'
import CreateLeaveRequest from './createleaverequest'
import Loader from '../../shared/loader'
import LeaveRequestTable from './leavetable'
import { authenticateSelector } from '../../../api/authSlice';

// import io from 'socket.io-client'
// const ENDPOINT = "http://localhost:5000"
// let socket

export default function Leave(){
  const dispatch = useDispatch()
  const {loading,all_leave} = useSelector(leaveRequestSelector)
  const { role,user} = useSelector(authenticateSelector)
  const [LeaveAddVisible,SetLeaveAddVisible] = useState(false)


  
  // const [socketConnected,SetsocketConnected] = useState(false)

  console.log({user});
 

  useEffect(()=>{  

    // socket = io(ENDPOINT)
    // socket.emit("setup",user)
    // socket.on("Connected",()=>{SetsocketConnected(true)})


  dispatch(fetchEmployeeLeave(user?._id,role))

  },[role])

    return(
      
          <div className="pt-5 ">
          <div className=" pr-1 mb-2 items-center justify-between">  
       
          {
            role == 'employee'?<Button onClick={()=>SetLeaveAddVisible(true)} type="primary" icon={<PlusOutlined />}>
                    Request Leave </Button>:""
          }
            <ModalForm 
                   isVisible={LeaveAddVisible} 
                    title="CREATE LEAVE REQUEST"
                    footer={false}
                    className=""
                    width="60%"
                    cancel={()=>SetLeaveAddVisible(!LeaveAddVisible)}>


            <CreateLeaveRequest  cancel={()=>SetLeaveAddVisible(!LeaveAddVisible)}/>
            </ModalForm>

            {
            loading ? <Loader/> :  <LeaveRequestTable data={all_leave}/>
          }
        </div>
        </div>
    )
}