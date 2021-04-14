/**
 * Created Date: 2021-01-06 04:15:15
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-25 02:43:37
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import {
  createSlice,
  createEntityAdapter,
} from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const appStateAdapter = createEntityAdapter()

const initialState = appStateAdapter.getInitialState({
  collapsed: false,
  defaultOpenKeys: [],
  defaultSelectedKeys: ['home']
})

const appStateSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    resetAppState(state, action) {
      state.collapsed = false
      state.defaultOpenKeys = []
      state.defaultSelectedKeys = ['home']
    },
    setCollapsed(state, action) {
      state.collapsed = action.payload
    },
    setDefaultOpenKeys(state, action) {
      state.defaultOpenKeys = [...action.payload]
    },
    setDefaultSelectedKeys(state, action) {
      state.defaultSelectedKeys = [...action.payload]
    }
  }
})

export const { resetAppState, setCollapsed, setDefaultOpenKeys, setDefaultSelectedKeys } = appStateSlice.actions

const appStatePersistConfig = {
  key: 'appState',
  storage: storage
}

export default persistReducer(appStatePersistConfig, appStateSlice.reducer)