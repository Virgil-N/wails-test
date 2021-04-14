/**
 * Created Date: 2020-11-30 11:17:03
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-24 02:29:04
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appStateReducer from './appState'
import userReducer from './user'
import playerReducer from './player'
import testReducer from './test'

const rootPersistConfig = {
  key: 'root',
  storage: storage,
  blacklist: ['appState', 'user', 'playerReducer', 'test']
}

const rootReducer = combineReducers({
  appState: appStateReducer,
  user: userReducer,
  player: playerReducer,
  test: testReducer
})

export default persistReducer(rootPersistConfig, rootReducer)