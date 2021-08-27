package main

import (
	_ "embed"
	"fmt"

	"github.com/wailsapp/wails"
)

func basic() string {
	return "World!"
}

//go:embed frontend/build/static/js/main.js
var js string

//go:embed frontend/build/static/css/main.css
var css string

type MyStruct struct {
	runtime *wails.Runtime
}

func (s *MyStruct) WailsInit(runtime *wails.Runtime) error {
	// Save runtime
	s.runtime = runtime

	// Do some other initialisation
	selectedFile := runtime.Dialog.SelectSaveFile()
	fmt.Println(selectedFile)

	return nil
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
	app.Bind(basic)
	app.Run()
	myStruct := MyStruct{}
	myStruct.WailsInit(&wails.Runtime{})
}
