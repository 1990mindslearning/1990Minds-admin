import {Table, Tabs} from 'antd'
import Employee from './employee'
import Login from './login'
import Education from './education'
import Personal from './personal'
import Experience from './experience'
import Bank from './bank'
import Salary from './salary'
import Loader from '../../../shared/loader'
import EmployeeTable from '../employeetable'


 

 
import { getLoginInfo,getEmployeeInfo,Createemployee,CreateFinish,employeeSelector,Createlogin,getPersonalInfo,Createpersonal, getEducationInfo,Createeducation,getExperienceInfo,Createexperience, getBankInfo, Createbank, Createsalary,getSalaryInfo} from '../../../../api/employee'
import {useDispatch, useSelector} from 'react-redux'
const {TabPane} = Tabs


export default function CreateEmployee(){
    const { loading ,all_employee} = useSelector(employeeSelector) 

    const dispatch = useDispatch();

    const {activeTab,employee,login,personal,education,experience,bank,salary} = useSelector(employeeSelector)
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

    return (
        <div className=" rounded-lg bg-white p-5 shadow-sm" style={{height:'100%', border:'1px solid #e5e5e5'}}>
        <Tabs activeKey={activeTab} onTabClick={(k, e)=>ontab(k, e)}>
            <TabPane tab = "Employee" key = "1">
                <Employee info={getEmployeeInfo} actionMethod={ Createlogin} />
            </TabPane>
            <TabPane tab = "Login" disabled = {login? false :true} key = "2">
                <Login info={getLoginInfo} actionMethod={ Createpersonal} />
            </TabPane>
            <TabPane tab = "Personal" disabled ={personal ? false:true} key = "3">
                <Personal info={getPersonalInfo} actionMethod={ Createeducation} />
            </TabPane>
            <TabPane tab = "Education" disabled={education ? false:true} key = "4">
                <Education info={getEducationInfo} actionMethod={ Createexperience} />
            </TabPane>
            <TabPane tab = "Experience" disabled ={experience ? false : true} key = "5">
                <Experience info={getExperienceInfo} actionMethod={ Createbank} />
            </TabPane>
            <TabPane tab = "Bank" disabled={bank? false:true} key = "6">
                <Bank info={getBankInfo} actionMethod={ Createsalary} />
            </TabPane>
            <TabPane tab = "Salary" disabled = {salary? false :true} key = "7">
                <Salary  info = {getSalaryInfo} actionMethod={ CreateFinish} />
            </TabPane>
         

        </Tabs>
                  
        

        </div>
    )
}