import React from 'react';
import { Flex, Layout } from 'antd';
import SysNavBar from "@/components/SysNavBar";
import {Outlet} from "react-router";

const { Sider, Content } = Layout;

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
};


const L: React.FC = () => {
  return <Flex gap="middle" wrap className={'w-full h-full'}>
    <Layout className={'w-full h-full'}>
      <Sider width="256px">
        <SysNavBar />
      </Sider>
      <Layout>
        <Content style={contentStyle} className={'box-border p-2.5 bg-blend-lighten'}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  </Flex>
}

export default L;