/*
 * Created Date: 2021-08-28 04:10:57
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-08-29 05:01:23
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

package store

import (
	"fmt"

	"github.com/wailsapp/wails"
)

type AppStore struct {
	r     *wails.Runtime
	store *wails.Store
}

type AppState struct {
	SidebarOpend bool
}

func NewAppStore() *AppStore {
	store := &AppStore{
		r:     &wails.Runtime{},
		store: &wails.Store{},
	}
	return store
}

func (appStore *AppStore) SetState(s string) {
	fmt.Println("update", s)
	appStore.store.Update(func(data string) string {
		return data
	})
}

func (appStore *AppStore) WailsInit(runtime *wails.Runtime) error {
	appStore.r = runtime
	appStore.store = runtime.Store.New("appStore", "123")

	appStore.store.Set("456")

	appStore.store.Subscribe(func(data string) {
		println("New Value:", data)
	})
	runtime.Events.On("sendStore", func(s ...interface{}) {
		fmt.Println("send: ", s)
	})
	runtime.Events.On("getStore", func(...interface{}) {
		runtime.Events.Emit("sendStore", appStore.store)
	})

	return nil
}
