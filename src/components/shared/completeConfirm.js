import React from 'react'
import { Popconfirm  } from 'antd';

export default function CompletedConfirm({children, title="", action="", confirm, cancel}) {

 
      
    return (
        <Popconfirm
        title={`Have you ${(action !== "") ? action : 'Completed'} this task?`}
        onConfirm={confirm}
        onCancel={cancel}
        okText="Yes"
        cancelText="No"
      >
          {children}
          </Popconfirm>
    )
}
