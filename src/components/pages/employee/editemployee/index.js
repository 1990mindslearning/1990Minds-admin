import {Tabs} from 'antd'
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import Employee from './employee';
import Login from './login'
import Personal from './personal'
import Education from './education'
import Experience from './experience'
import Bank from './bank'
import Salary from './salary'

import {fetchOneEmployee,employeeSelector, getLoginInfo,getEmployeeInfo,Createemployee,CreateFinish,Createlogin,getPersonalInfo,Createpersonal, getEducationInfo,Createeducation,getExperienceInfo,Createexperience, getBankInfo, Createbank, Createsalary,getSalaryInfo} from '../../../../api/employee'


const { TabPane } = Tabs;

export default function Edit(){
    const {id} = useParams();
    const dispatch = useDispatch()

    const {current_employee} = useSelector(employeeSelector)
    const {activeTab,login,personal,education,experience,bank,salary} = useSelector(employeeSelector)

    console.log(current_employee)

    useEffect(()=>{
        dispatch(fetchOneEmployee(id))
    
    },[])

    const ontab = (k, e) =>{
        e.preventDefault();
        console.log("Key is:",k)
          if(k === "2"){
              dispatch(Createlogin());      
          } else if(k === "3"){       
            dispatch(Createpersonal());
          }else if(k === "4"){       
            dispatch(Createeducation());
          } else if(k === "5"){      
            dispatch(Createexperience());
          } else if(k === "6"){
            dispatch(Createbank())
          } else if(k === "7"){
            dispatch(Createsalary())
          } else 
            dispatch(Createemployee())
        }

    return(
        <div className=" rounded-lg bg-white p-5 shadow-sm" style={{height:'100%', border:'1px solid #e5e5e5'}}>
            <Tabs activeKey={activeTab} onTabClick={(k, e)=>ontab(k, e)}>
            <TabPane tab = "Employee" key = "1">
                <Employee info={getEmployeeInfo} actionMethod={ Createlogin} data = {current_employee}/>
            </TabPane>
            <TabPane tab = "Login" disabled = {login? false :true} key = "2">
                <Login info={getLoginInfo} actionMethod={ Createpersonal} data = {current_employee}/>
            </TabPane>
            <TabPane tab = "Personal" disabled ={personal ? false:true} key = "3">
                <Personal info={getPersonalInfo} actionMethod={ Createeducation} data = {current_employee}/>
            </TabPane>
            <TabPane tab = "Education" disabled={education ? false:true} key = "4">
                <Education info={getEducationInfo} actionMethod={ Createexperience} data = {current_employee}/>
            </TabPane>
            <TabPane tab = "Experience" disabled ={experience ? false : true} key = "5">
                <Experience info={getExperienceInfo} actionMethod={ Createbank} data = {current_employee}/>
            </TabPane>
            <TabPane tab = "Bank" disabled={bank? false:true} key = "6">
                <Bank info={getBankInfo} actionMethod={ Createsalary} data = {current_employee}/>
            </TabPane>
            <TabPane tab = "Salary" disabled = {salary? false :true} key = "7">
                <Salary  info = {getSalaryInfo} actionMethod={ CreateFinish} data = {current_employee}/>
            </TabPane>
            </Tabs>   
        </div>

    
        )
}