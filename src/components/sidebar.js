import React  from 'react'
import styled from 'styled-components'
import { Button, Layout, Menu } from 'antd';
import logo123 from '../images/1990logo.png'
import {authenticateSelector} from '../api/authSlice'
import { useSelector} from 'react-redux'
import {Link, useLocation} from 'react-router-dom'



import {
    ProjectOutlined,
    AppstoreOutlined,
    TeamOutlined ,
    SendOutlined,
    CheckCircleOutlined,
    DollarOutlined, 
    KeyOutlined 
  } from '@ant-design/icons';

const {  Sider } = Layout;

export default function Sidemenu({ collapsed }) {

const {pathname} = useLocation()
console.log(pathname);
 

const { role } = useSelector(authenticateSelector)
 

console.log(role);

    return (
   <SideMenuWrap >
            
             <Sider width={250}    trigger={null} collapsible collapsed={collapsed}>
             <div className="pt-1 " >
            {
              collapsed ? <img src={logo123} className="d-block mx-auto" width="70px" alt="logo"/> :
              <img src={logo123} style={{marginLeft:"2rem",marginTop:"2rem"  }} className="d-block mx-auto py-0" width="150px" alt="logo"/>
            }
            </div>

          <Menu
           theme='light'
           mode="inline"
           defaultSelectedKeys={[pathname]}
           className="menu"
          >
           
          <Menu.Item key="/dashboard/home" icon={<AppstoreOutlined />} >   
           <Link to="/dashboard/home">Dashboard</Link> 
          </Menu.Item>

           
            {(role === 'admin') && <Menu.Item key="/dashboard/employee" icon={<TeamOutlined />}>
           <Link to="/dashboard/employee">Employee</Link> 
          </Menu.Item>}


          <Menu.Item key="/dashboard/payslip" icon={<DollarOutlined /> } >   
           <Link to="/dashboard/payslip">Payslip</Link> 
          </Menu.Item>

          <Menu.Item key="/dashboard/todolist" icon={<CheckCircleOutlined /> } >   
           <Link to="/dashboard/todolist">My TodoList</Link> 
          </Menu.Item>

          <Menu.Item key="/dashboard/leaverequest" icon={<SendOutlined  />} >   
           <Link to="/dashboard/leaverequest">Leave Request</Link> 
          </Menu.Item>

          {(role === 'admin') &&<Menu.Item key="/dashboard/clients" icon={<TeamOutlined />} >   
           <Link to="/dashboard/clients">Clients</Link> 
          </Menu.Item>}

          {(role === 'admin') &&<Menu.Item key="/dashboard/credential-manager" icon={<KeyOutlined /> } >   
           <Link to="/dashboard/credential-manager" style={{fontSize:'15px'}}>Credential Manager</Link> 
          </Menu.Item>}

          {(role === 'admin') &&<Menu.Item key="/dashboard/projects" icon={<ProjectOutlined />} >   
           <Link to="/dashboard/projects" style={{fontSize:'15px'}}>Projects</Link> 
          </Menu.Item>}

          {(role === 'admin') &&<Menu.Item key="/dashboard/versioncontrol" >
           <Link className=' absolute bottom-0' to={`/version-release`} target="_blank">Version Release</Link>
           </Menu.Item>}
          </Menu>
         
        </Sider>
        </SideMenuWrap>
      
    )
}


const SideMenuWrap = styled.div`
.ant-menu:not(.ant-menu-horizontal) 
margin:5px ;



.ant-menu-item-selected {
    background-color: white !important;
    border-radius: 5px;
    box-shadow: 2px 2px 4px 1px #fff;
    svg{
  color: black !important;
}
}
.ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected a {
  color: black !important;
  
}
.menu{
font-size:1rem;
letter-spacing:0.2px;
margin-top:4rem ;

svg{
  font-size:1.25rem;
  transform:translate(-6px, -4px);
  color:var(--brandColor);
}
}
.mode{
position:absolute;
bottom:5%;
left:10%;
 ${'' /* .ant-switch{
  background-color:${props=>props.color? "grey":"#1890FF"};
}  */}
}
`