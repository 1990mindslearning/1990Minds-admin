import React from 'react';
import { Modal } from 'antd';

export default function ModalForm({children, footer, className, width,  cancel, title, isVisible}) {


    return (
        <div>
 <Modal 
 width={width}
 title={title}
 footer={footer}
 className={className}
  visible={isVisible}
    onCancel={cancel}>
      {children}
      </Modal> 
        </div>
    )
}
