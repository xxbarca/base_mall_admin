import React, {useEffect, useMemo } from 'react';

import { Menu } from 'antd';
import {generateMenu} from "@/router/AuthGuard.tsx";
import {routes} from "@/router/routes.tsx";
import {useLocation, useNavigate} from "react-router";
import {useGlobalStore} from "@/store/useGlobalStore.ts";



const SysNavBar: React.FC = () => {
  const navigate = useNavigate()
  const {updateActiveKey} = useGlobalStore()
  const location = useLocation()
  useEffect(() => {
    updateActiveKey(location.pathname)
  }, [location.pathname, updateActiveKey]);

  const items = useMemo(() => {
    return generateMenu(routes)
  }, [])
  const onTitleClick = ({key}: {key: string}) => {
    updateActiveKey(key)
    navigate(key)
  }
  return (
    <div style={{ width: 256 }}>
      <Menu
        defaultSelectedKeys={[location.pathname]}
        mode="inline"
        theme="dark"
        items={items}
        onClick={onTitleClick}
      />
    </div>
  );
};

export default SysNavBar;