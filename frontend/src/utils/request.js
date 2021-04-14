/**
 * Created Date: 2020-12-19 09:42:52
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-02-18 04:45:21
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import axios from 'axios'
import { getTokenByName } from '@/utils/cookie'

export function setToken(tokenName, token) {
  if (tokenName === 'accessToken') {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token
  }
  if (tokenName === 'refreshToken') {
    axios.defaults.headers.common['Refresh-Token'] = 'Bearer ' + token
  }
}

const service = axios.create({
  baseURL:  process.env.REACT_APP_PATH + process.env.REACT_APP_API_PREFIX,
  // baseURL: '/test/api',
  headers: {
    'Content-Type': 'application/json',
    withCredentials: true
  },
  timeout: 10000
})

// Request interceptors
service.interceptors.request.use(
  (config) => {
    const accessToken = getTokenByName('accessToken')
    const refreshToken = getTokenByName('refreshToken')
    config.headers['Authorization'] = 'Bearer ' + accessToken
    config.headers['Refresh-Token'] = 'Bearer ' + refreshToken
    return config
  },
  (error) => {
    Promise.reject(error)
  }
)

// Response interceptors
service.interceptors.response.use(
  (response) => {
    const res = { ...response.data }
    if (res && Object.prototype.hasOwnProperty.call(res, 'code') && res.code !== 2000) {
      if (res.code === 5001 || res.code === 5002 || res.code === 5003 || res.code === 5004 || res.code === 5005 || res.code === 5006) {
        console.log('用户未登录或登录错误')
        window.location.href = window.location.origin + process.env.REACT_APP_PATH
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default service

