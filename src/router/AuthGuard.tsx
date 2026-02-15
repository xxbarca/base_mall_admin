import {Outlet} from "react-router";
import type {AppRouteObject, RouteMeta} from "@/router/router.tsx";
import {useEffect} from "react";
import {routes} from "@/router/routes.tsx";
import type {MenuItem} from "@/components/SysNavBar";

export const generateMenu = (routeList: AppRouteObject[] = routes, parent: null): MenuItem[] => {
  return routeList
    .filter(route => !route.meta?.hideInMenu && route.name)
    .sort((a, b) => (a.meta?.order || 0) - (b.meta?.order || 0))
    .map(route => ({
      // key: route.path || route.name || '',
      key: parent ? parent.path + '/' + route.path : route.path,
      icon: route.meta?.icon,
      label: route.meta?.title || route.name,
      children: route.children ? generateMenu(route.children, route) : undefined,
    }))
}

const createRouteMap = (routes: AppRouteObject[], parentPath = ''): Map<string, AppRouteObject> => {
  const map = new Map()

  routes.forEach(route => {
    const currentPath = route.path
      ? `${parentPath}/${route.path}`.replace(/\/+/g, '/')
      : parentPath

    if (route.path) {
      map.set(currentPath, route)
    }

    if (route.children) {
      const childrenMap = createRouteMap(route.children, currentPath)
      childrenMap.forEach((value, key) => map.set(key, value))
    }
  })

  return map
}

const getRouteMeta = (
  pathname: string,
  routeMap: Map<string, AppRouteObject>
): RouteMeta | undefined  => {
  const route = routeMap.get(pathname)
  if (!route) return undefined

  // 可以在这里实现 meta 的继承逻辑
  return route.meta
}

export const AuthGuard = () => {
  useEffect(() => {
    const routeMap = createRouteMap(routes)
    const meta = getRouteMeta(location.pathname, routeMap)
  }, []);
  return <div className={'w-full h-full xxx'}>
    <Outlet />
  </div>
}