/*
 * Created Date: 2021-09-24 03:13:28
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-09-24 04:57:33
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

package models

import (
	"encoding/json"
	"fmt"

	"github.com/mitchellh/mapstructure"
	"github.com/wailsapp/wails"
)

type UI struct {
	r     *wails.Runtime
	store *wails.Store
}

type UIStore struct {
	AppName      string `mapstructure:"appName"`
	SidebarOpend bool   `mapstructure:"sidebarOpend"`
}

func NewUI() *UI {
	ui := &UI{
		r:     &wails.Runtime{},
		store: &wails.Store{},
	}
	return ui
}

func (ui *UI) WailsInit(runtime *wails.Runtime) error {
	store := UIStore{AppName: "Wails App", SidebarOpend: false}
	ui.r = runtime
	ui.store = runtime.Store.New("ui", store)

	// 仅仅显示而已
	ui.store.Subscribe(func(data UIStore) {
		fmt.Println("UIStore changed to: ", data)
	})

	// 前台请求获取 store
	runtime.Events.On("getStore", func(s ...interface{}) {
		b, err := json.Marshal(ui.store.Get())
		if err != nil {
			fmt.Printf("json encode error: %s\n", err)
		}
		runtime.Events.Emit("sendStore", string(b))
	})

	// 前台更新 store，更新完再返回给前台
	runtime.Events.On("updateStore", func(s ...interface{}) {
		// 这个也可以判断类型
		// if reflect.ValueOf(s[0]).Kind() == reflect.Map {
		// 	fmt.Println("type = ", reflect.ValueOf(s[0]).Kind())
		// }
		if value, ok := s[0].(map[string]interface{}); ok {
			fmt.Println("is map, value = ", value)
			err := mapstructure.Decode(value, &store)
			if err != nil {
				fmt.Printf("decode store data error: %s\n", err)
			}
			ui.store.Set(store)

			// 和 set 一样的效果
			// ui.store.Update(func(currentVal UIStore) UIStore {
			// 	return store
			// })

			runtime.Events.Emit("sendStore", store)

			// b, err := json.Marshal(ui.store.Get())
			// if err != nil {
			// 	fmt.Printf("json encode error: %s\n", err)
			// }
			// runtime.Events.Emit("sendStore", string(b))
		} else {
			fmt.Println("store type error")
		}
	})
	return nil
}
