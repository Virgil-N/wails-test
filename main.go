package main

import (
	_ "embed"

	"github.com/Virgil-N/wails-test/client/models"
	"github.com/wailsapp/wails"
)

//go:embed frontend/build/static/js/main.js
var js string

//go:embed frontend/build/static/css/main.css
var css string

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
	app.Bind(models.NewUI())
	app.Bind(models.NewUser())
	app.Run()
}
