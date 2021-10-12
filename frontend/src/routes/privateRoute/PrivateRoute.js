/**
 * Created Date: 2020-12-29 02:45:23
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-08-19 10:27:23
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

// ~ 菜单栏路径和main内容组件路径必须相同且为页面路径的子路径
// ~ eg: main-page: /test/main; main-content为home组件时: /test/main/home

import React from 'react'
import { Switch, Redirect, withRouter } from 'react-router' // withRouter用于将router信息添加进props
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import CustomRoute from '@/routes/customRoute/CustomRoute'
import NoPermissions from '@/pages/error/NoPermissions' // 引入权限不足组件

function PrivateRoute(props) {

  const user = useSelector(state => {
    return state.user
  })

  const generateRouteList = (routes = [], list) => {
    for (let i = 0; i < list.length; i++) {
      routes.push(list[i])
      if (list[i].children && list[i].children instanceof Array) {
        generateRouteList(routes, list[i].children)
      }
    }
    return routes
  }

  const generateRouter = (routes) => {
    return routes.map((route) => {
      if (route.meta && route.meta.requireLogin) { // 第一步，验证是否需要登录就可进入
        if (user.isLogin) { // 判断是否登录
          const roles = route.roles || [] // 获取路由文件中的权限
          if (roles.includes(user.role)) { // 比较权限
            if (route.redirect) {
              // return <Route key={route.name} exact path={route.path} render={()=><Redirect to={route.redirect} />} />
              return <CustomRoute key={route.name} exact path={route.path} render={()=><Redirect to={route.redirect} />} meta={route.meta} roles={route.roles} />
            } else {
              // return  <Route key={route.name} exact path={route.path} component={route.component} />
              return <CustomRoute key={route.name} exact path={route.path} component={route.component} meta={route.meta} roles={route.roles} />
            }
          } else { // 权限不足
            // return <Route key={route.name} exact path={route.path} component={NoPermissions} />
            return <CustomRoute key={route.name} exact path={route.path} component={NoPermissions} meta={route.meta} roles={route.roles} />
          }
        } else { // 没有登录
          return <Redirect key={route.name} to='/login' />
        }
      } else { // 不需要登录
        if (route.redirect) {
          // return <Route key={route.name} exact path={route.path} render={()=><Redirect to={route.redirect} />} />
          return <CustomRoute key={route.name} exact path={route.path} render={()=><Redirect to={route.redirect} />} meta={route.meta} roles={route.roles} />
        } else {
          // return  <Route key={route.name} exact path={route.path} component={route.component} />
          return <CustomRoute key={route.name} exact path={route.path} component={route.component} meta={route.meta} roles={route.roles} />
        }
      }
    })
  }

  let { routeList } = props
  const flatRoutes = generateRouteList([], routeList)
  const routes = generateRouter(flatRoutes)

  return (
    <Switch>
      {routes}
    </Switch>
  )
}

PrivateRoute.defaultProps = {
  routeList: []
}

PrivateRoute.propTypes = {
  routeList: PropTypes.array
}

export default withRouter(PrivateRoute)