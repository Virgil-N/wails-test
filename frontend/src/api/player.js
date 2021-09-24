/**
 * Created Date: 2021-03-24 10:45:10
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-24 10:46:59
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import request from '@/utils/request'

export const getPlayers = (data) => {
  return request({
    url: '/player/list',
    method: 'post',
    data
  })
}

export const getPlayer = (id) => {
  return request({
    url: `/player/info/${id}`,
    method: 'get'
  })
}

export const updatePlayer = (data) => {
  return request({
    url: '/player/update',
    method: 'post',
    data
  })
}

export const addPlayer = (data) => {
  return request({
    url: '/player/add',
    method: 'post',
    data
  })
}

export const delPlayer = (id) => {
  return request({
    url: `/player/delete/${id}`,
    method: 'delete'
  })
}
