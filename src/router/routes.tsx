import { Navigate} from "react-router";
import type {AppRouteObject} from "@/router/router.tsx";
import {Dashboard} from "@/pages/Dashboard";
import {DashboardOutlined, FileOutlined, SettingOutlined, UserOutlined} from "@ant-design/icons";
import {UserList} from "@/pages/UserList";
import {UserDetail} from "@/pages/UserDetail";
import {UserProfile} from "@/pages/UserProfile";
import {ArticleList} from "@/pages/ArticleList";
import {ArticleEdit} from "@/pages/ArticleEdit";
import {Settings} from '@/pages/Settings'
import {Category} from "@/pages/Category";
import {ChartBarStacked, Dot} from "lucide-react";

export const routes: AppRouteObject[] = [
  {
    path: "/category",
    name: "category",
    meta: {
      title: "分类管理",
      requiresAuth: true,
      icon: <ChartBarStacked />,
    },
    children: [
      {
        path: "categoryList",
        name: "categoryList",
        element: <Category />,
        meta: {
          title: '分类列表',
          icon: <Dot />
        }
      }
    ]
  }
]

export const _routes: AppRouteObject[] = [
  {
    path: '/',
    name: 'root',
    element: <Navigate to="/dashboard" replace />,
    meta: {
      hideInMenu: true,
    },
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    element: <Dashboard />,
    meta: {
      title: '仪表盘',
      requiresAuth: true,
      icon: <DashboardOutlined />,
      breadcrumb: '首页',
      order: 1,
    },
  },
  {
    path: '/user',
    name: 'user',
    meta: {
      title: '用户管理',
      requiresAuth: true,
      icon: <UserOutlined />,
      roles: ['admin', 'manager'],
      order: 2,
    },
    children: [
      {
        index: true,
        element: <Navigate to="/user/userList" replace />,
        meta: { hideInMenu: true },
      },
      {
        path: 'userList',
        name: 'userList',
        element: <UserList />,
        meta: {
          title: '用户列表',
          requiresAuth: true,
          icon: <UserOutlined />,
          permissions: ['user:view'],
          breadcrumb: '用户列表',
        },
      },
      {
        path: 'detail/:id',
        name: 'userDetail',
        element: <UserDetail />,
        meta: {
          title: '用户详情',
          requiresAuth: true,
          icon: <UserOutlined />,
          permissions: ['user:detail'],
          hideInMenu: true,
          breadcrumb: '用户详情',
        },
      },
      {
        path: 'profile',
        name: 'userProfile',
        element: <UserProfile />,
        meta: {
          title: '个人资料',
          requiresAuth: true,
          icon: <UserOutlined />,
          permissions: ['user:profile'],
          breadcrumb: '个人资料',
        },
      },
    ],
  },
  {
    path: '/article',
    name: 'article',
    meta: {
      title: '文章管理',
      requiresAuth: true,
      icon: <FileOutlined />,
      permissions: ['article:manage'],
      order: 3,
    },
    children: [
      {
        path: 'articleList',
        name: 'articleList',
        element: <ArticleList />,
        meta: {
          title: '文章列表',
          requiresAuth: true,
          icon: <UserOutlined />,
          permissions: ['article:view'],
          breadcrumb: '文章列表',
        },
      },
      {
        path: 'articleEdit/:id',
        name: 'articleEdit',
        element: <ArticleEdit />,
        meta: {
          title: '编辑文章',
          requiresAuth: true,
          icon: <UserOutlined />,
          permissions: ['article:edit'],
          hideInMenu: true,
          breadcrumb: '编辑文章',
        },
      },
    ],
  },
  {
    path: '/settings',
    name: 'settings',
    element: <Settings />,
    meta: {
      title: '系统设置',
      requiresAuth: true,
      icon: <SettingOutlined />,
      roles: ['admin'],
      order: 99,
    },
  },
]