/**
 * Created Date: 2020-12-31 01:56:36
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-02-05 04:45:20
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from 'react'
import variables from '@/styles/variables.module.scss'
import ShowMsg from '@/utils/msg'
import TestA from '@/components/forTest/TestA'

function UserFile() {
  return (
    <div className="user-file">
      <p>UserFile</p>
      <button onClick={() => {ShowMsg("error", "123456")}}>show message</button>
      <button onClick={() => {ShowMsg("loading", "123456")}}>show message</button>
      <TestA></TestA>
      <style jsx>{`
        .user-file {
        }
      `}</style>
    </div>
  )
}

export default UserFile