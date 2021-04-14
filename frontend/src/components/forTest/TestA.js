/**
 * Created Date: 2021-02-01 04:15:51
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-02-02 09:02:22
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Button, Form, Input } from 'antd'
import { setStatus } from '@/store/reducers/test'

import TestB from '@/components/forTest/TestB'
import TestC from '@/components/forTest/TestC'

// 测试动态切换组件
function UserFile() {
  const test = useSelector((state) => {
    return state.test
  })

  const dispatch = useDispatch()
  
  const changeComponent = () => {
    if (test.status === 'on') {
      dispatch(setStatus('off'))
    } else {
      dispatch(setStatus('on'))
    }
  }

  return (
    <div className="test">
      <button onClick={changeComponent}>change component</button>
      <p>{test.status}</p>
      {
        test.status === "on" ? (
          <TestB className="test-b"></TestB>
        ) : (
          <TestC className="test-c"></TestC>
        )
      }
      <style jsx>{`
        .test {
          background-color: #cccccc;
          .test-b {
            color: red;
          }
          .test-c {
            color: blue;
          }
        }
      `}</style>
    </div>
  )
}

export default UserFile