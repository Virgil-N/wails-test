/**
 * Created Date: 2020-12-28 10:35:16
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-01-28 05:25:24
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import Cookies from 'js-cookie'

const millisecond = new Date().getTime()
const expiresTime = new Date(millisecond + 60 * 1000 * 300)
const attributes = { expires: expiresTime, path: process.env.REACT_APP_PATH }

export const getTokenByName = (name) => Cookies.get(name)
export const setTokenByName = (name, token) => Cookies.set(name, token, attributes)
export const removeTokenByName = (name) => Cookies.remove(name, { path: process.env.REACT_APP_PATH })