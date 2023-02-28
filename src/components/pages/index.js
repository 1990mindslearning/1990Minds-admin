import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { Tabs, Button } from 'antd';
import { StickyContainer, Sticky } from 'react-sticky';
// import Department from './department'
// import Faculty from './faculty'
import Employee from '../../api/employee'
import Payslip from '../../api/payslip';

const { TabPane } = Tabs;


export default function Database() {

  const renderTabBar = (props, DefaultTabBar) => (
    <Sticky bottomOffset={80}>
      {({ style }) => (
        <DefaultTabBar {...props} className="site-custom-tab-bar" style={{ ...style }} />
      )}
    </Sticky>
  );


     return (
      <div>
         
         <StickyContainer>
    <Tabs defaultActiveKey="1" renderTabBar={renderTabBar}  >
      <TabPane tab="Employee" key="1" >
        {/* <Department/> */}

      </TabPane>
      <TabPane tab="Payslip" key="2">
      

      </TabPane>


      
      {/* <Faculty/>
      
      {/* </TabPane> */}
      {/* <TabPane tab="Students" key="4">
        {/* <Students/> */}

      {/* </TabPane> */}
      {/* <TabPane tab="Placement & Alumni" key="5">
        Content of Tab Pane 5
      </TabPane> */} 
      {/* <TabPane tab="Profile" key="6">
        Content of Tab Pane 6
      </TabPane> */}
    </Tabs>
  </StickyContainer>

      
      </div>
  )
}




