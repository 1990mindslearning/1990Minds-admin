import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Menu, Dropdown, Button } from 'antd';
import {LogoutOutlined  } from '@ant-design/icons';
import {FaUserAlt} from 'react-icons/fa'
import {logOut} from '../../api/authSlice'
import {Link} from 'react-router-dom'
import {authenticateSelector} from '../../api/authSlice'
// import payslip from '../../api/payslip';
 
// import { fetchAllPayslip } from '../../api/payslip';
 

 



export default function DropdownSec({username, userIcon, icon, history}) {

  const dispatch = useDispatch()

  const { user } = useSelector(authenticateSelector) 
    const menu = (
        <Menu>

<Menu.Item >
            <Button type="text" className="text-success text-capitalize" >

            {/* <Button to={`/dashboard/my-profile/${user && user._id}`} onClick = {()=>console.log("I clicked")}><b>My Profile</b> </Button>  */}
 
 
            <Link to="/dashboard/userprofile">My Profile</Link> 
            </Button>
          </Menu.Item>

     <Menu.Item >
    
        <Button icon={<LogoutOutlined style={{ transform:'translateY(-2.5px)'}}/>} onClick={()=>{  dispatch(logOut()) }} type="link" danger  >
      Logout
      </Button>
    

          
          </Menu.Item>
          
         
        </Menu>
      );



    return (
        <Dropdown overlay={menu}>
        <Button size="middle" type="ghost" style={{border:"1px solid #3498DB"}}  shape="circle" onClick={e => e.preventDefault()}>
      <FaUserAlt style={{margin:'3px auto', fontSize:"1rem",  transform:'translateY(-1.5px)', }} className="text-xl  text-brandColor mx-auto"/>
        </Button>
      </Dropdown>
    )
}
