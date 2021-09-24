/**
 * Created Date: 2021-08-05 03:55:09
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-08-17 07:58:12
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import request from '@/utils/request'

export const getDocuments = (data) => {
  return request({
    url: '/query',
    method: 'post',
    data
  })
}
