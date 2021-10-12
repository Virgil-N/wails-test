/**
 * Created Date: 2021-02-01 04:04:34
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-02-01 04:39:08
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
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

const testAdapter = createEntityAdapter()

const initialState = testAdapter.getInitialState({
  status: 'on'
})

const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    setStatus(state, action) {
      console.log('change test status')
      state.status = action.payload
    }
  }
})

export const { setStatus } = testSlice.actions

const testPersistConfig = {
  key: 'test',
  storage: storage
}

export default persistReducer(testPersistConfig, testSlice.reducer)