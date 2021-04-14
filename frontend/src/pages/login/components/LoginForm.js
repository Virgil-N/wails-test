/**
 * Created Date: 2020-12-24 11:19:41
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-02-18 05:22:07
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom"
import { Button, Form, Input } from 'antd'
import JSEncrypt from 'jsencrypt'
import {
  UserOutlined,
  LockOutlined,
} from '@ant-design/icons'
import ShowMsg from '@/utils/msg'
import variables from '@/styles/variables.module.scss'
import { userLogin } from '@/store/reducers/user'

function useIsMountedRef() {
  const isMountedRef = useRef(null)
  useEffect(() => {
    isMountedRef.current = true
    return () => isMountedRef.current = false
  })
  return isMountedRef
}

function LoginForm() {
  let history = useHistory()
  const isMountedRef = useIsMountedRef()
  const [isSendingRequest, setIsSendingRequest] = useState(false)
  const dispatch = useDispatch()
  const [form] = Form.useForm()

  const submitForm = async(e) => {
    e.preventDefault()
    if (e.type === 'keyup' && e.keyCode !== 13) {
      return false
    }
    if (isMountedRef.current) {
      const params = await form.validateFields()
      if (params) {
        setIsSendingRequest(true)
        const encrypt = new JSEncrypt()
        encrypt.setPublicKey(process.env.REACT_APP_PUBLIC_KEY)
        const password = encrypt.encrypt(params.password)
        const sendData = JSON.stringify({ name: params.username, password })
        const res = await dispatch(userLogin(sendData))
        if (res && res.error) {
          ShowMsg('error', res.error.message)
        }
        setIsSendingRequest(false)
        history.push('/main/home')
      }
    }
  }

  return (
    <div className="login-wrap">
      <Form form={form} name="loginForm" className="login-form">
        <Form.Item name="username" rules={[{ required: true, message: '请输入用户名！' }]}>
          <Input
            prefix={<UserOutlined className="site-form-item-icon"></UserOutlined>}
            style={{width: variables.cardInputWidth}}
            placeholder="用户名">
          </Input>
        </Form.Item>
        <Form.Item name="password" rules={[{ required: true, message: '请输入密码！' }]}>
          <Input
            prefix={<LockOutlined className="site-form-item-icon"></LockOutlined>}
            style={{width: variables.cardInputWidth}}
            type="password"
            placeholder="密码"
            onKeyUp={submitForm}>
          </Input>
        </Form.Item>
        <Form.Item>
          <Button type="primary" disabled={isSendingRequest} onClick={submitForm}>登录</Button>
          <Button type="link" htmlType="button">忘记密码</Button>
        </Form.Item>
      </Form>
      <style jsx>{`
        .login-wrap {
          display: flex;
          flex-direction: row;
          justify-content: center;
          align-items: center;
          height: 100%;
        }
        :global(.login-wrap .ant-card) {
          width: 500px;
        }
        :global(.login-form .ant-form-item-control-input-content) {
          display: flex;
          flex-direction: row;
          justify-content: center;
        }
      `}</style>
    </div>
  )
}

export default LoginForm