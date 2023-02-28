import { Card} from 'antd';
import {Link} from 'react-router-dom'
import { useHistory} from 'react-router-dom'

const {Meta} = Card


export default function CredentialManagementTable({data}){
    const history = useHistory()
    
    let result = data.filter((value, index, myarray) => myarray.findIndex((m) => m.company_name?.company_name === value.company_name?.company_name) === index);


    console.log("Client",result)
    return(
        <div className=' p-8 grid grid-cols-3 '>
        {
            result.map((item)=>{
            return (
                <div className='mb-4'>
                <Card hoverable={true}
                      className=' flex items-center'
                      onClick = {(e)=>history.push(`/dashboard/showCredentials/${item.company_name?._id}`)}
                   
                      style={{width:300,height:100}}
                      bordered= {true}
                      cover={<img alt="company_logo" style ={{marginTop:'8px',padding:'10px',borderRadius:'12px',width:'80px',height:'auto'}}src={item.company_name?.company_logo}/>}>
                <Meta
                   description = {item.company_name?.company_name}/>
                </Card>
                </div>
            )
        })
        }
       </div>
    )

}