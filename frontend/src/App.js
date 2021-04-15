/**
 * Created Date: 2021-04-15 02:06:04
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-04-15 03:50:46
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React, { useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { Button, Card, Form, Input, Row, Col } from 'antd'
// import {
//   UserOutlined,
//   LockOutlined,
// } from '@ant-design/icons'
import variables from '@/styles/variables.module.scss'
import Card from '@/components/card/Card'
import LoginForm from '@/pages/login/components/LoginForm'

function Login(props) {
  // const [username, setUsername] = useState('')
  // const [Password, setPassword] = useState('')

  const cardHeadStyle = {
    backgroundColor: variables.cardHeadColor
  }

  const cardBodyStyle = {
    backgroundColor: variables.cardBgColor,
    borderColor: variables.cardBorderColor
  }

  return (
    <div className="login-wrap">
      <Card title="登录" content={<LoginForm></LoginForm>} headStyle={cardHeadStyle} bodyStyle={cardBodyStyle}></Card>
      <style jsx>{`
        .login-wrap {
          width: 100%;
          height: 100%;
          display: grid;
          justify-content: center;
          align-content: center;
        }
      `}</style>
    </div>
  )
}

export default Login