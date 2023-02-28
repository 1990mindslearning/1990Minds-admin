import React, {useState, useEffect} from 'react'
import { Layout, Affix } from 'antd';
import styled from 'styled-components'
import SideBar from './sidebar'
import Header from './header'
import {  Route, Switch, useRouteMatch,Link } from 'react-router-dom';


import Loader from '../components/shared/loader'
import {fetchAdminProfile, authenticateSelector} from '../api/authSlice'
import { empProfile } from '../api/employee';



// import Home from './pages/dashboard'
import Employee from './pages/employee';
import EditEmployee from './pages/employee/editemployee/index';
import Payslip from './pages/payslip';
import {useDispatch, useSelector} from 'react-redux';

import Todolist from './pages/todolist';
import EmpProfile from './pages/empProfile';
import Home from './pages/home/index'
import Leave from './pages/leave'
import Client from './pages/client'
import CredentialHome from './pages/credential'
import CreateCredential from './pages/credential/create-credential';
import ShowCredentials from './pages/credential/show_credentials'
import CreateEmployee from './pages/employee/createEmployee/index'


import {AnimatePresence} from 'framer-motion'
import CreateClient from './pages/client/createclient';
import EditClient from './pages/client/editclient';
import Projects from './pages/projects/index';

import CreateProject from './pages/projects/createproject';
import ShowProject from './pages/projects/show-project';
import EditProject from './pages/projects/editProject/index';
 

import {notification} from 'antd'
import socket from '../socket'
import ShowLeave from './pages/leave/show-leave';
import ShowNotification from './shared/showNotifcation'




const {  Content} = Layout;
 

export default function Admin({location}) {
    let { path } = useRouteMatch();
    const [collapsed, setCollapsed] = useState(false)
     

    const dispatch = useDispatch()
    const {loading, token} = useSelector(authenticateSelector)
     
    
    const openNotification = (data) => {

      const args = {
        message: data.msg,
        duration: 0,
        btn: <a className = " hover: bg-blue-200 underline" 
        href = {`/dashboard/show-leave/${data.leave._id}`}>View</a>
      };
      notification.success(args);
    };
     

useEffect(()=>{

    
        dispatch(fetchAdminProfile(token))

        socket.on("result",(data)=>{
          console.log(data)

        openNotification(data)

          
        })
}, [])




 


    const  toggle = () => {

        setCollapsed(!collapsed)

      
      };

      const changeTheme = () =>{

        return false
    
    }
 

 

    return (
      <> {

  loading? <Loader/> : <AdminWrap >
        <Layout>
        <Affix offsetTop={0} onChange={affixed => console.log(affixed)}>
     <SideBar collapsed={collapsed} color={false}  click={changeTheme}/>
     </Affix>

        <Layout className="site-layout">
        
        <Header click={toggle} collapsed={collapsed}/>


        <Content
      className="site-layout-background"
      style={{
        margin: '24px 16px',
        padding: 24,
        minHeight: 1000,
      }}
    >
          <AnimatePresence exitBeforeEnter initial={false} >

        
        <Switch location={location} key={location.pathname}>
 
<Route  exact path={`${path}/home`}  component={Home} />

<Route  exact path={`${path}/employee`}  component={Employee} />
<Route exact path = {`${path}/create-employee`} component ={CreateEmployee}/>
<Route exact path={`${path}/edit-employee/:id`} component={EditEmployee}/>
<Route exact path ={`${path}/userprofile`} component ={EmpProfile}/>


<Route  exact path={`${path}/payslip`}  component={Payslip} />
<Route exact path ={`${path}/todolist`} component = {Todolist}/>
<Route exact path ={`${path}/leaverequest`} component ={Leave}/>
<Route exact path = {`${path}/show-leave/:id`} component = {ShowLeave}/>


<Route exact path ={`${path}/clients`} component ={Client} />
<Route exact path ={`${path}/create-client`} component ={CreateClient}/>
<Route exact path = {`${path}/edit-client/:id`} component ={EditClient}/>
<Route exact path = {`${path}/credential-manager`} component ={CredentialHome}/>
<Route exact path = {`${path}/create-credentials`} component ={CreateCredential}/>
<Route exact path = {`${path}/showCredentials/:id`} component = {ShowCredentials}/>

<Route exact path = {`${path}/projects`} component = {Projects}/>
<Route exact path ={`${path}/create-project`} component ={CreateProject}/>
<Route exact path = {`${path}/showProject/:id`} component = {ShowProject}/>
<Route exact path = {`${path}/edit-project/:id`} component = {EditProject}/>

<Route exact path = {`${path}/show-notification`} component = {ShowNotification}/>
 


 
</Switch>
 </AnimatePresence>
          </Content> 
        </Layout>
      </Layout>
    </AdminWrap>
     
      }
       </>
    )
}


const AdminWrap = styled.div`

.ant-layout {
.ant-layout-sider{
    height: 100vh;
    background:${props => !props.color ? "#001529" : "#FFFFFF"};
}
}

.logo {
height: 32px;
background: rgba(255, 255, 255, 0.2);
margin: 32px;



}
#components-layout-demo-custom-trigger .logo {
height: 32px;

margin: 16px;
}
.site-layout .site-layout-background {
background: #fff;
}
`