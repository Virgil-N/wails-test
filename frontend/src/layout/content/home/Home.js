/**
 * Created Date: 2020-12-10 06:25:48
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-02-05 04:50:53
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from 'react'

function Home() {
  return (
    <div className="home">
      <p>nothing here</p>
      <style jsx>{`
        :global(.layout) {
          height: 100%;
        }
        .trigger {
          color: green;
          font-size: 18px;
          line-height: 64px;
          padding: 0 24px;
          cursor: pointer;
          transition: color 0.3s;
          &:hover {
            color: red;
          }
        }
        .trigger:hover {
          color: #1890ff;
        }
        .logo {
          height: 32px;
          background: rgba(255, 255, 255, 0.3);
          margin: 16px;
        }
      `}</style>
    </div>
  )
}

export default Home