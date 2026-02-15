import React, {useEffect, useState} from 'react';
import {
  AppstoreOutlined,
  ContainerOutlined,
  DesktopOutlined,
  MailOutlined,
  PieChartOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import {generateMenu} from "@/router/AuthGuard.tsx";
import {routes} from "@/router/routes.tsx";
import {useNavigate} from "react-router";

export type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <PieChartOutlined />, label: 'Option 1' },
  { key: '2', icon: <DesktopOutlined />, label: 'Option 2' },
  { key: '3', icon: <ContainerOutlined />, label: 'Option 3' },
  {
    key: 'sub1',
    label: 'Navigation One',
    icon: <MailOutlined />,
    children: [
      { key: '5', label: 'Option 5' },
      { key: '6', label: 'Option 6' },
      { key: '7', label: 'Option 7' },
      { key: '8', label: 'Option 8' },
    ],
  },
  {
    key: 'sub2',
    label: 'Navigation Two',
    icon: <AppstoreOutlined />,
    children: [
      { key: '9', label: 'Option 9' },
      { key: '10', label: 'Option 10' },
      {
        key: 'sub3',
        label: 'Submenu',
        children: [
          { key: '11', label: 'Option 11' },
          { key: '12', label: 'Option 12' },
        ],
      },
    ],
  },
];

const SysNavBar: React.FC = () => {
  const [items, setItems] = useState<MenuItem[]>([]);
  const [key, setKey] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    const menus = generateMenu(routes)
    setItems(menus)
  }, []);
  const onTitleClick = ({key}) => {
    setKey(key)
    navigate(key)
  }
  return (
    <div style={{ width: 256 }}>
      <Menu
        defaultSelectedKeys={[key]}
        mode="inline"
        theme="dark"
        items={items}
        onClick={onTitleClick}
      />
    </div>
  );
};

export default SysNavBar;