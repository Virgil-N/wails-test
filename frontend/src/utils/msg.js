/**
 * Created Date: 2021-02-05 04:21:17
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-02-05 04:42:19
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from 'react'
import { message } from 'antd'
import { CloseOutlined } from '@ant-design/icons'

const ShowMsg = (type, text) => {
  let hide
  const onClose = () => {
    hide()
  }
  let funcName
  switch (type) {
    case 'info':
      funcName = message.info
      break
    case 'success':
      funcName = message.success
      break
    case 'warning':
      funcName = message.warning
      break
    case 'error':
      funcName = message.error
      break
    case 'loading':
      funcName = message.loading
      break
    default:
      funcName = message.info
      break
  }
  const elemNode = <span className="msg-content">
    {text}
    <CloseOutlined
      onClick={onClose}
      style={{ color: "#999", cursor: "pointer", marginLeft: "12px", fontSize: "14px" }}
    />
  </span>

  hide = funcName(elemNode)
}

export default ShowMsg