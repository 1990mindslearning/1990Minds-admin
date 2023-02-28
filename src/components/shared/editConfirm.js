import React from 'react'
import { Popconfirm  } from 'antd';

export default function EditConfirm({children, title="", action="", confirm, cancel}) {

 
      
    return (
        <Popconfirm
        title={`Are you in ${(action !== "") ? action : 'progress'} of this task?`}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
          {children}
          </Popconfirm>
    )
}
