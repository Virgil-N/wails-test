/**
 * Created Date: 2020-12-28 09:32:43
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-07-31 12:46:00
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from "redux-persist"
import { getCookieByName } from '@/utils/cookie'

export const authTokenMiddleware = store => next => action => {

  const accessToken = getCookieByName('react-gin-accessToken')
  const refreshToken = getCookieByName('react-gin-refreshToken')

  if (action.type.indexOf('user/userLogin') === -1 &&
    action.type !== FLUSH &&
    action.type !== REHYDRATE &&
    action.type !== PAUSE &&
    action.type !== PERSIST &&
    action.type !== PURGE &&
    action.type !== REGISTER &&
    (!accessToken && !refreshToken)) {
    next({ type: 'user/setAccessToken', payload: '' })
    next({ type: 'user/setRefreshToken', payload: '' })
    next({ type: 'user/setUserLoginState', payload: false })
    next({ type: 'appState/resetAppState' })
  }

  // 刷新页面时触发
  if (action.type === REHYDRATE) {
    if (!accessToken) {
      next({ type: 'user/setAccessToken', payload: '' })
      next({ type: 'user/setRefreshToken', payload: '' })
      next({ type: 'user/setUserLoginState', payload: false })
      next({ type: 'appState/resetAppState' })
    }
  }

  if (action.type === 'user/userLogin/fulfilled' && action.payload && action.payload.accessToken && action.payload.refreshToken) {
    // ~ 暂时在request文件中直接使用cookie实现
    // setToken('accessToken', action.payload.accessToken)
    // setToken('refreshToken', action.payload.refreshToken)
  }
  return next(action)
}