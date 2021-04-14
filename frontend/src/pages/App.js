/**
 * Created Date: 2020-12-11 02:15:39
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-25 10:42:36
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router-dom'
import Main from '@/layout/Main'
import Login from '@/pages/login/Login'
import NotFound from '@/pages/error/NotFound'

function App() {
  return (
    <Switch>
      <Route path="/" exact key="root" render={()=><Redirect to="/main/home" />} />
      <Route path="/main" key="main" component={Main} />
      <Route path="/login" key="login" component={Login} />
      <Route path="/notFound" key="notFound" component={NotFound} />
      <Redirect to="/notFound" />
    </Switch>
  )
}

export default withRouter(App)
