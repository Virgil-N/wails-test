/**
 * Created Date: 2020-12-19 10:33:35
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2020-12-19 10:33:46
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import request from '@/utils/request'

export const getUsers = (data) => {
  return request({
    url: '/user/list',
    method: 'post',
    data
  })
}

export const getUser = (id) => {
  return request({
    url: `/user/info/${id}`,
    method: 'get'
  })
}

export const getUserByName = (name) => {
  return request({
    url: `/user/get_by_name/${name}`,
    method: 'get'
  })
}

export const updateUser = (data) => {
  return request({
    url: '/user/update',
    method: 'post',
    data
  })
}

export const addUser = (data) => {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

export const delUser = (id) => {
  return request({
    url: `/user/delete/${id}`,
    method: 'delete'
  })
}

export const login = (data) => {
  return request({
    url: '/user/login',
    method: 'post',
    data
  })
}

export const logout = () => {
  return request({
    url: '/user/logout',
    method: 'get'
  })
}

// ~ visitor
export const register = (data) => {
  return request({
    url: '/register',
    method: 'post',
    data
  })
}