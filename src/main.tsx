import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import zhCN from 'antd/locale/zh_CN';
import { ConfigProvider } from 'antd'
import './index.css'
import {AppRouter} from "@/router/AppRouter.tsx";
import {GlobalModal} from "@/components/GlobalModal";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ConfigProvider locale={zhCN}>
      <GlobalModal />
      <AppRouter />
    </ConfigProvider>
  </StrictMode>,
)
