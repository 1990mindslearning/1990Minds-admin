import React, {useEffect} from 'react'
import { authenticateSelector,fetchlogin } from '../../api/authSlice'
import banner from '../../images/menuIcons/office1990.png'
import logo from '../../images/office6.png'
import { useForm } from "react-hook-form";
import { useSelector,useDispatch } from 'react-redux';



export default function Login31Oct({history}){

    const { isAuthenticate } = useSelector(authenticateSelector)
    const dispatch = useDispatch()

    const {register,handleSubmit} = useForm();

    const onSubmit = data => dispatch(fetchlogin(data))


    useEffect(()=>{
        if(isAuthenticate){
            window.location.href = '/dashboard/home'
        }else{
            history.push('/')
        }
    },[isAuthenticate])


    return(
        <div className=' bg-black'>
        <div className=' flex'>
       <img class="img2" src={banner} style={{height:'100vh'}}/>

        <div class="box ">
        <div>
            
        <form class='form' onSubmit={handleSubmit(onSubmit)}>
        <img class="img1" src={logo} width="100px"/>
        <div class="inputBox">
        <input {...register("email")} type="text" required="required"/>
        <span>Username</span>
        <i></i>
        </div>
        <div class="inputBox">
        <input {...register("password")} type="password" required="required"/>
        <span>Password</span>
        <i></i>
        </div>
        <div class="links">
        </div>
        <input type="submit" value="Login"/>
        </form>
        </div>
        </div>
        </div>
        </div>
    )
}
