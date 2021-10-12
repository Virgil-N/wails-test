/**
 * Created Date: 2021-08-27 11:48:15
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-10-12 11:27:33
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import Login from "@/pages/login/Login"

const routeList = [
  // {
  //   path: "/main/home",
  //   name: "home",
  //   component:  Home,
  //   meta: { title: "首页", icon: HomeIcon, requireLogin: true, hide: false },
  //   roles: ["admin", "manager", "visitor"]
  // },
  {
    path: "/login",
    name: "login",
    component:  Login,
    meta: { title: "登录", requireLogin: false, hide: false },
    roles: []
  },
  // {
  //   path: "/main/noPermissions",
  //   name: "noPermissions",
  //   component:  NoPermissions,
  //   meta: { title: "权限不足", icon: SendIcon, requireLogin: true, hide: true },
  //   roles: []
  // }
];

export default routeList;