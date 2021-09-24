/**
 * Created Date: 2021-01-28 05:52:39
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-09-24 08:53:43
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

const createProxyMiddleware = require('http-proxy-middleware')
const https = require('https')
const fs = require('fs')

module.exports = function (app) {
  app.use(createProxyMiddleware('/test/api', {
    target: process.env.REACT_APP_SERVER_IP,
    pathRewrite: {
      "^/test/api": ""
    },
    changeOrigin: true,
    secure: false,
    logLevel: "error",
    headers: {
      Connection: "keep-alive"
    },
    // 开启 https 代理服务
    // agent: new https.Agent({
    //   keepAlive: true,
    //   key: fs.readFileSync('cert/client.key', 'utf8'),
    //   cert: fs.readFileSync('cert/client.crt', 'utf8')
    // })
  }))
}