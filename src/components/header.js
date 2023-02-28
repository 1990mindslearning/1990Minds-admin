import React, {useState} from 'react'
import {useSelector} from 'react-redux'
import { MenuUnfoldOutlined, LogoutOutlined,MenuFoldOutlined} from '@ant-design/icons';
import { Layout, Badge } from 'antd';
import styled from 'styled-components'
import { MdNotifications} from 'react-icons/md'
import {UserOutlined  } from '@ant-design/icons';
import Dropdown from './shared/dropdown'
import {useLocation, Link} from 'react-router-dom'
 
import {LastWord} from './shared/lastpathword'
 
 
import{authenticateSelector} from '../api/authSlice'
import { leaveRequestSelector } from '../api/leaveRequest';


const { Header } = Layout;


export default function HeaderMenu({collapsed, click}) {
const  path = useLocation()
 
const {status_count} = useSelector(leaveRequestSelector)
const {user} = useSelector(authenticateSelector)

 
const [notification,setNotification] = useState([])

 
console.log(user?.notifications?.length);

const handleNotification =()=>{
  console.log("cliecked notification")
   setNotification(user?.notifications?.filter(item =>item?.isView === false))
   console.log(notification)
} 
     return (
      <HeaderMenuWrap>
     <Header className="site-layout-background" style={{ padding: 0 }}>
     <div className="d-flex flex-end">
     {collapsed ?
      <MenuUnfoldOutlined className="trigger" onClick={()=>click()}/>
       :<MenuFoldOutlined className="trigger" onClick={()=>click()}/>}  
        
<span className="lastword">
{LastWord(path.pathname.split('-').join(' ')) }
</span>
 
<span   className=' mr-5 float-right'><Link to = {`/dashboard/show-notification`}><Badge size="small" count={user?.notifications?.length} style={{marginTop:"6px" ,marginRight:"9px"}}>
        
     <MdNotifications onClick={<Link></Link> } style = {{ fontSize:"28px", paddingRight:"8px", cursor:"pointer"}}  
                   className="text-brandColor text-3xl"/> 
          </Badge></Link>
        <Dropdown 
            username="admin"
            userIcon={<LogoutOutlined />}
            icon={<UserOutlined/>}/></span>
        
</div>

       </Header>
      </HeaderMenuWrap>
 )
}

const HeaderMenuWrap = styled.div`
.lastword {
font-size:1.6rem;
width:50%;
text-transform:capitalize;
}
.trigger {
font-size: 20px;
line-height: 64px;
padding: 0 24px  ;
cursor: pointer;
transition: color 0.3s;

&:hover{

   color: #1890ff; 
}}
#components-layout-demo-custom-trigger .trigger {
font-size: 18px;
// line-height: 64px;
padding: 0 24px;
cursor: pointer;
transition: color 0.3s;

&:hover{

   color: #1890ff;
}
}

.n{

display:flex;
justify-content:flex-end;
line-height:64px;

width:100%;

button{

margin: auto;
}
}
`
