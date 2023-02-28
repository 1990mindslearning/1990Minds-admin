import React from 'react'
import { Popconfirm  } from 'antd';

export default function DeleteConfirm({children, title="", action="", confirm, cancel}) {

 
      
    return (
        <Popconfirm
        title={`Are you sure to ${(action !== "") ? action : 'delete'} this entry?`}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
          {children}
          </Popconfirm>
    )
}
