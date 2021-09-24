package main

import (
	_ "embed"
	"fmt"

	"github.com/mitchellh/mapstructure"
	"github.com/wailsapp/wails"
)

//go:embed frontend/build/static/js/main.js
var js string

//go:embed frontend/build/static/css/main.css
var css string

type App struct {
	r     *wails.Runtime
	store *wails.Store
}

type AppStore struct {
	AppName      string `mapstructure:"appName"`
	SidebarOpend bool   `mapstructure:"sidebarOpend"`
}

func NewApp() *App {
	app := &App{
		r:     &wails.Runtime{},
		store: &wails.Store{},
	}
	return app
}

func main() {

	app := wails.CreateApp(&wails.AppConfig{
		Width:     1024,
		Height:    768,
		MinWidth:  400,
		MinHeight: 400,
		Resizable: true,
		Title:     "wails-test",
		JS:        js,
		CSS:       css,
		Colour:    "#F4F6F8",
	})
	app.Bind(NewApp())
	app.Run()
}

func (app *App) WailsInit(runtime *wails.Runtime) error {
	store := AppStore{AppName: "Wails App", SidebarOpend: false}
	app.r = runtime
	app.store = runtime.Store.New("app", store)

	// 仅仅显示而已
	app.store.Subscribe(func(data AppStore) {
		fmt.Println("AppStore changed to: ", data)
	})

	// 前台请求获取 store
	runtime.Events.On("getStore", func(s ...interface{}) {
		runtime.Events.Emit("sendStore", app.store.Get())
	})

	// 前台更新 store，更新完再返回给前台
	runtime.Events.On("updateStore", func(s ...interface{}) {
		err := mapstructure.Decode(s[0], &store)
		if err != nil {
			fmt.Printf("decode store data error: %s\n", err)
		}
		app.store.Set(store)

		// 和 set 一样的效果
		// app.store.Update(func(currentVal AppStore) AppStore {
		// 	return store
		// })

		runtime.Events.Emit("sendStore", app.store.Get())
	})

	return nil
}
