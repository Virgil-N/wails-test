/**
 * Created Date: 2020-12-28 10:35:16
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-07-09 04:38:59
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import Cookies from 'js-cookie'

// ! 加path后会导致必须刷新页面才能获取到cookie值

const millisecond = new Date().getTime()
const expiresTime = new Date(millisecond + 60 * 1000 * 60 * 12)
const attributes = { expires: expiresTime, /*path: process.env.REACT_APP_PATH*/ }

export const getCookieByName = (name) => Cookies.get(name)
export const setCookieByName = (name, token) => Cookies.set(name, token, attributes)
export const removeCookieByName = (name) => Cookies.remove(name, { path: process.env.REACT_APP_PATH })