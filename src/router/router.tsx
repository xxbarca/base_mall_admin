import {createBrowserRouter, type RouteObject} from "react-router";
import {Login} from "@/pages/Login";
import L from "@/pages/L";
import {routes} from "@/router/routes.tsx";
import {AuthGuard} from "@/router/AuthGuard.tsx";
import React, {Suspense} from "react";
import {Spin} from "antd";
import {NoPermission} from "@/pages/NoPermission";
import {NotFound} from "@/pages/NotFound";

// 定义 meta 的数据结构
export interface RouteMeta {
  title?: string              // 页面标题
  requiresAuth?: boolean      // 是否需要登录
  roles?: string[]           // 允许访问的角色
  permissions?: string[]      // 权限点
  icon?: React.ReactNode      // 菜单图标
  hideInMenu?: boolean        // 是否在菜单中隐藏
  keepAlive?: boolean         // 是否缓存页面
  breadcrumb?: string | null  // 面包屑名称（null 表示不显示）
  order?: number              // 菜单排序
  parentName?: string         // 父级路由名称（用于菜单高亮）
  [key: string]: any          // 其他自定义属性
}

// 扩展 RouteObject
export type AppRouteObject = RouteObject & {
  meta?: RouteMeta
  name?: string              // 路由唯一标识（用于菜单）
  children?: AppRouteObject[] // 递归子路由
}

// export type MenuItem = {
//   key: string
//   icon: React.ReactNode
//   label?: string
//   children: AppRouteObject[] | undefined
// }

const withLoading = (element: React.ReactNode) => (
  <Suspense fallback={<Spin size="large" className="global-loading" />}>
    {element}
  </Suspense>
)
const processRoutes = (routeList: AppRouteObject[]): AppRouteObject[] => {
  return routeList.map(route => {
    const { element, children, meta, ...rest } = route

    // 创建新的路由对象
    const processedRoute: AppRouteObject = {
      ...rest,
      element: element ? withLoading(element) : undefined,
      children: children ? processRoutes(children) : undefined,
    }

    // 如果有 meta 信息，保留
    if (meta) {
      processedRoute.meta = meta
    }

    return processedRoute
  })
}

const wrapWithAuth = (routes: AppRouteObject[]): AppRouteObject[] => {
  return [
    {
      element: <AuthGuard />,
      children: processRoutes(routes),
    },
  ]
}


// 创建路由实例
export const router = createBrowserRouter([
  {
    path: '/',
    element: <L />,
    children: wrapWithAuth(routes),
  },
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
  {
    path: '/403',
    element: <NoPermission />,
  },
])