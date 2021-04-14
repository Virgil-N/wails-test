/**
 * Created Date: 2021-03-24 10:28:47
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-24 04:24:00
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
import { getPlayer, getPlayers, addPlayer } from '@/api/player'

const userAdapter = createEntityAdapter()

const initialState = userAdapter.getInitialState({
  players: []
})

export const getPlayerList = createAsyncThunk(
  'player/getPlayerList',
  async(params) => {
    const res = await getPlayers(params)
    return res
  }
)

export const addNewPlayer = createAsyncThunk(
  'player/addPlayer',
  async(params) => {
    const res = await addPlayer(params)
    return res
  }
)

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    setPlayers(state, action) {
      console.log('set player', action.payload)
      state.players = action.payload
    },
    setPlayer(state, action) {

    }
  },
  extraReducers: {
    [getPlayerList.pending]: (state) => {
      // 
    },
    [getPlayerList.fulfilled]: ( state, action) => {
      const res = action.payload
      if (res && res.code === 2000) {
        state.players = action.payload
      }
    },
    [addNewPlayer.rejected]: (state) => {
      // 
    }
  }
})

export const { setPlayer, setPlayers } = playerSlice.actions

const playerPersistConfig = {
  key: 'player',
  storage: storage
}

export default persistReducer(playerPersistConfig, playerSlice.reducer)