package main

import (
	_ "embed"
	_ "wails-test/store"

	"github.com/wailsapp/wails"
)

//go:embed frontend/build/static/js/main.js
var js string

//go:embed frontend/build/static/css/main.css
var css string

type A struct {
	Name string
}

func NewA() *A {
	return &A{}
}

func (a *A) Say(s string) string {
	return s
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
	app.Bind(NewA())
	// s := store.NewAppStore()
	// s.SetState("opopop")
	// app.Bind(store.NewAppStore())
	app.Run()
}
