import React from 'react';
import ReactDOM from 'react-dom';
import { MemoryRouter } from 'react-router';
import 'core-js/stable';
import App from './App';
import { ThemeProvider } from "@material-ui/core";
import theme from "./theme";
import "./styles/index.scss";

import * as serviceWorker from './serviceWorker';

import * as Wails from '@wailsapp/runtime';

Wails.Init(() => {
  ReactDOM.render(
    <ThemeProvider theme={theme}>
      <React.StrictMode>
        <MemoryRouter>
          <App />
        </MemoryRouter>
      </React.StrictMode>
    </ThemeProvider>,
    document.getElementById("app")
  )
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
