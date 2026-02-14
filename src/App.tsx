import React from 'react';
import { Flex, Layout } from 'antd';
import SysNavBar from "@/components/SysNavBar";

const { Header, Sider, Content } = Layout;

const headerStyle: React.CSSProperties = {
  textAlign: 'center',
  color: '#fff',
  height: 64,
  paddingInline: 48,
  lineHeight: '64px',
  backgroundColor: '#4096ff',
};

const contentStyle: React.CSSProperties = {
  textAlign: 'center',
  minHeight: 120,
  lineHeight: '120px',
  color: '#fff',
  backgroundColor: '#0958d9',
};


const App: React.FC = () => (
  <Flex gap="middle" wrap className={'w-full h-full'}>
    <Layout className={'w-full h-full'}>
      <Sider width="256px">
        <SysNavBar />
      </Sider>
      <Layout>
        <Header style={headerStyle}>Header</Header>
        <Content style={contentStyle}>Content</Content>
      </Layout>
    </Layout>
  </Flex>
);

export default App;