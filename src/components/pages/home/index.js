import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import { authenticateSelector } from '../../../api/authSlice';
import {Link} from 'react-router-dom'
import {notification} from 'antd'
import socket from '../../../socket'

import {Card} from 'antd'
import Sparkles from 'react-sparkle'

export default function Home() {
    const {role,user} = useSelector(authenticateSelector)
 

    // const openNotification = (data) => {

    //   const args = {
    //     message: data.msg,
    //     duration: 5,
    //     btn: <a href={`/dashboard/leaverequest`}>View Leave Request</a>
    //   };
    //   notification.success(args);
    // };
     

    // useEffect(() => {
    //     socket.on("admin",(data)=>{
    //       console.log(data)

    //     openNotification(data)

          
    //     })
    // },[]);

    return (
         

        <div style={{fontFamily:'Poppins'}} >
          <p class="pl-16 text-1xl mb-2 mt-12 ">Hellooo,<br/><span className='pt-3 font-bold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-purple-700 to-pink-500' >{(role == 'employee'?user.personal?.full_name:"Admin")}</span></p>
          
          <p class=" pl-16 text-lg text-gray-600">Hope you are having a great day today. </p>
          <div class="border-b-2 border-gray-300 ml-16"></div>
          <Link to="/dashboard/todolist">  
          <button class="bg-blue-500 font-medium text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded  ml-16 mt-6 space-x-4 w-34">
                  Today Todo list
          </button></Link>
          <Link to="/dashboard/userprofile">  
          <button class=" bg-blue-500 font-medium text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded ml-10 mt-6 space-x-4 w-34">
            Profile page
          </button></Link>

          {/* <div className="card">
         <div className="quote">
         <Card hoverable={true} style={{border:'1px solid light-grey'}}>

            <h2>{quote}</h2>
            <small>{author}</small>
         </Card>
         </div>
        
    </div> */}
          </div>
     
    )
}
