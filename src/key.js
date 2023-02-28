

const  keyUri = {

    // BACKEND_URI:'https://sea-turtle-app-eg2ub.ondigitalocean.app/api'
    //localhost url:'http://localhost:5000/api'

    BACKEND_URI:'http://localhost:5000/api',

    SOCKET_URI:"http://localhost:5000",

        
    
    // SOCKET_URI:"https://sea-turtle-app-eg2ub.ondigitalocean.app",
    // BACKEND_URI:'https://sea-turtle-app-eg2ub.ondigitalocean.app/api'

}

let token = localStorage.getItem('token')
const config = {
    headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
    }
  };

export  {keyUri, config }




// <div class="icon">
//        <Link to = {`/dashboard/show-notification`}><Badge size="small" count={user?.notifications.length} style={{marginTop:"-23px" ,marginRight:"8px"}}>
//         {/* <Badge size="small"  style={{marginTop:"18px" ,marginRight:"5px"}}> */}
//         <MdNotifications onClick={<Link></Link> } style = {{ fontSize:"28px", paddingRight:"8px", cursor:"pointer"}}  
//                    className="text-brandColor text-3xl"/> 
//           </></Link>
//         <Dropdown 
//             username="admin"
//             userIcon={<LogoutOutlined />}
//             icon={<UserOutlined/>}/>
//         </div>    