/**
 * Created Date: 2021-01-06 04:15:15
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-08-19 10:34:32
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import {
  createSlice,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const appStateAdapter = createEntityAdapter();

const initialState = appStateAdapter.getInitialState({
  collapsed: false,
  sidebarOpend: true,
  defaultOpendKeys: "",
  defaultSelectedKey: "home"
  // defaultSelectedKey: "document-query"
});

const appStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    resetAppState(state) {
      state.collapsed = false;
      state.sidebarOpend = true;
      state.defaultOpendKeys = "";
      state.defaultSelectedKey = "home";
    },
    setCollapsed(state, action) {
      state.collapsed = action.payload;
    },
    setSidebarOpend(state, action) {
      state.sidebarOpend = action.payload;
    },
    setDefaultOpendKeys(state, action) {
      state.defaultOpendKeys = action.payload;
    },
    setDefaultSelectedKey(state, action) {
      state.defaultSelectedKey = action.payload;
    }
  }
});

export const { resetAppState, setCollapsed, setSidebarOpend, setDefaultOpendKeys, setDefaultSelectedKey } = appStateSlice.actions;

const appStatePersistConfig = {
  key: "appState",
  storage: storage
};

export default persistReducer(appStatePersistConfig, appStateSlice.reducer);