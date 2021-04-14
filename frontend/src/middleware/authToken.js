/**
 * Created Date: 2020-12-28 09:32:43
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-25 03:13:56
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
// import { setToken } from '@/utils/request'
import { getTokenByName } from '@/utils/cookie'

export const authTokenMiddleware = store => next => action => {

  const accessToken = getTokenByName('accessToken')
  const refreshToken = getTokenByName('refreshToken')

  if (action.type !== 'user/userLogin/pending' &&
    action.type !== FLUSH &&
    action.type !== REHYDRATE &&
    action.type !== PAUSE &&
    action.type !== PERSIST &&
    action.type !== PURGE &&
    action.type !== REGISTER &&
    (!accessToken && !refreshToken)) {
    next({ type: 'user/setAccessToken', payload: null })
    next({ type: 'user/setRefreshToken', payload: null })
    next({ type: 'user/setUserLoginState', payload: false })
    next({ type: 'appState/resetAppState' })
  }

  // 刷新页面时触发
  if (action.type === REHYDRATE) {
    if (!accessToken) {
      next({ type: 'user/setAccessToken', payload: null })
      next({ type: 'user/setRefreshToken', payload: null })
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