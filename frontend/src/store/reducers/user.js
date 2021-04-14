/**
 * Created Date: 2020-12-19 10:34:21
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-02-19 12:51:23
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
import { setTokenByName } from '@/utils/cookie'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { login, logout, getUser, getUserByName, getUsers } from '@/api/user'

const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState({
  accessToken: null,
  refreshToken: null,
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

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      console.log('set accessToken', action.payload)
      state.accessToken = action.payload
      setTokenByName('accessToken', action.payload)
    },
    setRefreshToken(state, action) {
      console.log('set refreshToken', action.payload)
      state.refreshToken = action.payload
      setTokenByName('refreshToken', action.payload)
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
    [userLogin.fulfilled]: ( state, action) => {
      const res = action.payload
      if (res && res.code === 2000) {
        state.isLogin = true
        state.accessToken = action.payload.data.accessToken
        state.refreshToken = action.payload.data.refreshToken
        setTokenByName('accessToken', action.payload.data.accessToken)
        setTokenByName('refreshToken', action.payload.data.refreshToken)
      }
    },
    [userLogin.rejected]: (state) => {
      state.isLogin = false
    },
    [userLogout.fulfilled]: ( state, action) => {
      // const res = action.payload
      // if (res && res.code === 2000) {
      //   state.isLogin = false
      //   state.accessToken = null
      //   state.refreshToken = null
      //   setTokenByName('accessToken', null)
      //   setTokenByName('refreshToken', null)
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