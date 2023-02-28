import React, {useState} from 'react'

import { Upload, Button, Space } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';



function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }


  export default  function  UploadImage({imgurl, handleChange, loading }) {


    // const [loading, setLoading] = useState(false)
    // const [imgurl, setImgurl] = useState()
    
    
    const uploadButton = (
      <div>
        {loading ? <LoadingOutlined  /> : <PlusOutlined />}
        <div style={{ marginTop: 8 }}>{loading? "uploading" :"Uplaod"}</div>
      </div>
    );
    
    
    // const handleChange = info => {
    
    
    //   if (info.file.status === 'uploading') {
    //     setImgurl('')
    //     setLoading(true)
    //     return;
    //   }
    //   if (info.file.status === 'done') {
    //     // Get this url from response in real world.
    //     getBase64(info.file.originFileObj, imageUrl => {
    
    //       setImgurl(imageUrl)
    //       setLoading(false)
      
    //       })
    //   }
    // };
    
      return (
        <div className="App">
         <Upload
          name="avatar"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          listType="picture-card"
          maxCount={1}
          className="avatar-uploader"
          showUploadList={false}
          onChange={handleChange()}
    
        >
      {/* {imgurl ? <img src={imgurl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}    */}
      
        {imgurl ? 
      
        <img src={imgurl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
       </Upload>
    
      
        </div>
      );
    }
    

