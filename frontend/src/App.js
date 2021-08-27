import React from 'react'
import { Route, Redirect, Switch, withRouter } from 'react-router'
// import Main from '@/layout/Main'
import Login from '@/pages/login/Login'
// import NotFound from '@/pages/error/NotFound'

const App = () => {
  return (
    <Switch>
      {/* <Route path="/" exact key="root" render={()=><Redirect to="/main/home" />} /> */}
      {/* <Route path="/main" key="main" component={Main} /> */}
      <Route path="/" key="login1" component={Login} />
      <Route path="/login" key="login" component={Login} />
      {/* <Route path="/notFound" key="notFound" component={NotFound} /> */}
      {/* <Redirect to="/notFound" /> */}
      {/* <Route exact path="/">
        <Login />
      </Route> */}
    </Switch>
  )
}

export default withRouter(App)