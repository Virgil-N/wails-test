/**
 * Created Date: 2020-12-19 10:34:21
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-10-20 09:37:53
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { setCookieByName } from '@/utils/cookie'
import { login, logout, getUserV, getUserByName, getUsers } from '@/api/user'

const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState({
  accessToken: '',
  refreshToken: '',
  isLogin: false,
  role: 'admin'
})

export const userLogin = createAsyncThunk(
  'user/userLogin',
  async(params) => {
    const res = await login(params)
    return res
  }
)

export const userLogout = createAsyncThunk(
  'user/userLogout',
  async() => {
    const res = await logout()
    return res
  }
)

export const getUserList = createAsyncThunk(
  'user/getUserList',
  async(params) => {
    const res = await getUsers(params)
    return res
  }
)

export const getUserB = createAsyncThunk(
  'user/getUserV',
  async(params) => {
    const res = await getUsers(params)
    return res
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      console.log('set accessToken', action.payload)
      state.accessToken = action.payload
      setCookieByName('react-gin-accessToken', action.payload)
    },
    setRefreshToken(state, action) {
      console.log('set refreshToken', action.payload)
      state.refreshToken = action.payload
      setCookieByName('react-gin-refreshToken', action.payload)
    },
    setUserLoginState(state, action) {
      console.log('set UserLoginState', action.payload)
      state.isLogin = action.payload
    }
  },
  extraReducers: {
    [userLogin.pending]: (state) => {
      // state.isLogin = false
    },
    [userLogin.fulfilled]: (state, action) => {
      const res = action.payload
      if (res && res.code === 2000) {
        state.isLogin = true
        state.accessToken = action.payload.data.accessToken
        state.refreshToken = action.payload.data.refreshToken
        setCookieByName('react-gin-accessToken', action.payload.data.accessToken)
        setCookieByName('react-gin-refreshToken', action.payload.data.refreshToken)
      }
    },
    [userLogin.rejected]: (state) => {
      state.isLogin = false
    },
    [userLogout.fulfilled]: ( state, action) => {
      // const res = action.payload
      // if (res && res.code === 2000) {
      //   state.isLogin = false
      //   state.accessToken = ''
      //   state.refreshToken = ''
      //   setTokenByName('accessToken', '')
      //   setTokenByName('refreshToken', '')
      // }
    }
  }
})

export const { setAccessToken, setRefreshToken, setUserLoginState } = userSlice.actions

const userPersistConfig = {
  key: 'user',
  storage: storage
}

export default persistReducer(userPersistConfig, userSlice.reducer)