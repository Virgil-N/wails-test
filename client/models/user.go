/*
 * Created Date: 2021-09-24 05:06:48
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-10-11 09:22:06
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

	"github.com/Virgil-N/wails-test/client/utils"
	"github.com/mitchellh/mapstructure"
	"github.com/wailsapp/wails"
)

type User struct {
	r     *wails.Runtime
	store *wails.Store
}

type UserStore struct {
	AppName      string `mapstructure:"appName"`
	SidebarOpend bool   `mapstructure:"sidebarOpend"`
}

func NewUser() *User {
	ui := &User{
		r:     &wails.Runtime{},
		store: &wails.Store{},
	}
	return ui
}

func (ui *User) WailsInit(runtime *wails.Runtime) error {
	store := UserStore{AppName: "Wails App", SidebarOpend: false}
	ui.r = runtime
	ui.store = runtime.Store.New("ui", store)

	// 仅仅显示而已
	ui.store.Subscribe(func(data UserStore) {
		fmt.Println("UserStore changed to: ", data)
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
			// ui.store.Update(func(currentVal UserStore) UserStore {
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

	runtime.Events.On("login", func(s ...interface{}) {

		req := utils.NewHttpClient("http://127.0.0.1:9292/user/login")
		req.SetSendType("json")
		var dataMap map[string]string
		mapstructure.Decode(s[0], &dataMap)
		req.SetBody(dataMap)
		resp, err := req.Post()
		if err != nil {
			fmt.Printf("request post error: %s\n", err)
		}
		fmt.Printf("get response data: %s\n", resp)

	})
	return nil
}
