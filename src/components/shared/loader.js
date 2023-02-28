import React from 'react'
import { Spin } from 'antd';
import styled from 'styled-components'

export default function SpinLoading({p="10px 0px 10rem 0px"}) {
    return (
        <SpinWrap padding={p}>
        <Spin className="example"  tip="Loading..." />
      </SpinWrap>
    )
}

const SpinWrap  = styled.div`
width:100%;
.example {
   
    display: block;
  text-align: center;
  border-radius: 4px;
  margin-bottom: 20px;
  padding: ${props => props.padding};
  margin: 20px 0;
}


`