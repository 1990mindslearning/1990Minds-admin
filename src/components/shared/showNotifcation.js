import {Card} from 'antd'
import { useDispatch, useSelector } from "react-redux"
import { authenticateSelector } from "../../api/authSlice"
import {updateNotify} from '../../api/admin'
import {Link} from 'react-router-dom'

export default function ShowNotification(){
    const {user} = useSelector(authenticateSelector)
    const dispatch = useDispatch()

    const handleNotify = (id,item)=>{
        // dispatch(updateNotify(id,item))
       
        console.log("Clicked the card",item)
        dispatch(updateNotify(id,item))
        
    }
     
    console.log(user)
    return(
        <div>
        {
        user?.notifications?.length < 1? <div className='flex justify-center place-content-center'>No notifications</div>:
        user?.notifications?.map((item) =>
        <Link to = {`/dashboard/show-leave/${item?.leave}`}>
        <div className=' grid grid-cols-2 mb-5'>
        <Card hoverable 
              onClick={()=>{handleNotify(item?._id,item)}}>
            <h1>{item?.msg} from {item?.from}</h1>
        </Card></div></Link>)
        }
        

        </div>
        
    )
}