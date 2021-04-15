/**
 * Created Date: 2020-12-29 02:22:53
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-04-15 05:21:27
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from 'react'
import { MemoryRouter } from 'react-router-dom'
import { Layout } from 'antd'
import routeList from '@/routes/index'
import PrivateRoute from '@/routes/privateRoute/PrivateRoute'
import Header from '@/layout/header/Header'
import Sidebar from '@/layout/sidebar/Sidebar'
import Breadcrumb from '@/layout/breadcrumb/Breadcrumb'

const { Content } = Layout

function Main() {
  return (
    <Layout id="main-layout">
      <Sidebar routeList={routeList}></Sidebar>
      <Layout>
        <Header></Header>
        <Breadcrumb></Breadcrumb>
        <Content id="main-content">
          <MemoryRouter>
            <PrivateRoute routeList={routeList} />
          </MemoryRouter>
        </Content>
      </Layout>
      <style jsx>{`
        :global(#main-layout) {
          background-color: #ffffff;
        }
        :global(#main-content) {
          margin-top: 114px;
          overflow: auto;
          position: relative;
        }
      `}</style>
    </Layout>
  )
}

export default Main