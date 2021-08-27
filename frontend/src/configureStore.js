/**
 * Created Date: 2021-08-27 03:09:57
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-08-27 03:15:10
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import { configureStore } from '@reduxjs/toolkit'
// import {
//   FLUSH,
//   REHYDRATE,
//   PAUSE,
//   PERSIST,
//   PURGE,
//   REGISTER
// } from "redux-persist"
import logger from 'redux-logger'
// import { authTokenMiddleware } from '@/middleware/authToken'
import rootReducer from '@/store/reducers'

export default function generateConfigureStore() {
  
  const preloadedState = {}
  
  const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
      // 解决报错问题
      // serializableCheck: {
      //   ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      // }
    }).concat(logger, /*authTokenMiddleware*/),
    devTools: process.env.NODE_ENV !== 'production',
    preloadedState,
    enhancers: [],
  })

  if (module.hot && process.env.NODE_ENV!=='production') {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('@/store/reducers', () => {
      const nextReducer = require('@/store/reducers')
      store.replaceReducer(nextReducer)
    })
  }
  return store
}