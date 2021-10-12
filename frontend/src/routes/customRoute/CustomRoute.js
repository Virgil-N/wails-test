/**
 * Created Date: 2021-02-03 11:30:55
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-24 03:17:42
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from 'react'
import { Route } from 'react-router' // withRouter用于将router信息添加进props
import PropTypes from 'prop-types'

// ~ 新建自定义route组件，为了在router中添加自定义属性

const CustomRoute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest} render={(props) =><Component {...props} />} />
  )
}

CustomRoute.propTypes = {
  component: PropTypes.func
}

export default CustomRoute