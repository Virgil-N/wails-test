/**
 * Created Date: 2020-10-13 09:44:07
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-26 04:07:57
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

// ~ 此路由中component为内容路由(二级及以下路由)，页面级路由直接写在App组件中

import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  DesktopOutlined,
  ContainerOutlined,
  MailOutlined,
} from '@ant-design/icons'

import Home from '@/layout/content/home/Home'
import UserFile from '@/layout/content/user/userFile/UserFile'
import UserList from '@/layout/content/user/userList/UserList'
import PlayerResult from '@/layout/content/player/playerResult/PlayerResult'
import PlayerList from '@/layout/content/player/playerList/PlayerList'
import NoPermissions from '@/layout/content/noPermissions/NoPermissions'
import Gis from '@/layout/content/gis/Gis'

const routeList = [
  {
    path: '/main/home',
    name: 'home',
    component:  Home,
    meta: { title: '首页', icon: AppstoreOutlined, requireLogin: true, hide: false },
    roles: ['admin', 'user1', 'user2']
  },
  {
    path: '/main/user',
    name: 'user',
    redirect: '/main/user/file',
    meta: { title: '用户', icon: MenuUnfoldOutlined, requireLogin: true, hide: false },
    roles: ['admin', 'user1', 'user2'],
    children: [
      {
        path: '/main/user/list',
        name: 'userList',
        component: UserList,
        meta: { title: '用户列表', icon: PieChartOutlined, requireLogin: true, hide: false },
        roles: ['admin', 'user1']
      },
      {
        path: '/main/user/file',
        name: 'userFile',
        component: UserFile,
        meta: { title: '用户资料', icon: MenuFoldOutlined, requireLogin: true, hide: false },
        roles: ['admin', 'user1']
      }
    ]
  },
  {
    path: '/main/player',
    name: 'player',
    redirect: '/main/player/list',
    meta: { title: '玩家', icon: MenuUnfoldOutlined, requireLogin: true, hide: false },
    roles: ['admin'],
    children: [
      {
        path: '/main/player/list',
        name: 'playerList',
        component: PlayerList,
        meta: { title: '玩家列表', icon: MenuFoldOutlined, requireLogin: true, hide: false },
        roles: ['admin']
      },
      {
        path: '/main/player/result',
        name: 'playerResult',
        component: PlayerResult,
        meta: { title: '玩家结果', icon: MailOutlined, requireLogin: true, hide: false },
        roles: ['admin']
      }
    ]
  },
  {
    path: '/main/gis',
    name: 'gis',
    component: Gis,
    meta: { title: 'GIS地图', icon: ContainerOutlined, requireLogin: true, hide: false },
    roles: ['admin', 'user1', 'user2']
  },
  {
    path: '/main/noPermissions',
    name: 'noPermissions',
    component:  NoPermissions,
    meta: { title: '权限不足', icon: DesktopOutlined, requireLogin: true, hide: true },
    roles: []
  }
]

export default routeList