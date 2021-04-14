import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'
import 'core-js/stable';
import 'antd/dist/antd.css'
import '@/styles/index.scss'
import { message } from 'antd'
import App from './pages/App';
import * as serviceWorker from './serviceWorker';
import generateConfigureStore from './configureStore'

import * as Wails from '@wailsapp/runtime';

const store = generateConfigureStore()
const persistor = persistStore(store)

// 全局设置 message 配置
message.config({
  top: 100,
  duration: 3,
  maxCount: 3,
  rtl: true
})

// Wails.Init(() => {
//   ReactDOM.render(
//     <React.StrictMode>
//       <App />
//     </React.StrictMode>,
//     document.getElementById("app")
//   );
// });

console.log('>>>>', Wails)

const renderApp = (Component) => {
  ReactDOM.render(
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter basename="/test">
          <Component></Component>
        </BrowserRouter>
      </PersistGate>
    </Provider>,
    document.getElementById('root')
  )
}

Wails.Init(() => {
  renderApp(App)
})

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
