/**
 * Created Date: 2021-02-03 04:50:43
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-02-19 12:36:03
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Breadcrumb as AntdBreadcrumb } from 'antd'
import routeList from '@/routes/index'

const generateTitleArr = (routePath, list = [], arr = []) => {
  for (let i = 0; i < list.length; i++) {
    if (routePath.indexOf(list[i].path) !== -1) {
      arr.push(list[i])
      if (list[i].children && list[i].children.length > 0) {
        generateTitleArr(routePath, list[i].children, arr)
      }
      break
    }
  }
  return arr
}

function Breadcrumb() {
  let history = useHistory()
  const matchedRoutes = generateTitleArr(history.location.pathname, routeList, [])

  const generateBreadcrumbItem = (list) => {
    return list.map((v, i) => {
      if (i + 1 === matchedRoutes.length) {
        return <AntdBreadcrumb.Item key={i}>{v.meta.title}</AntdBreadcrumb.Item>
      }
      return <AntdBreadcrumb.Item key={i}>
        <NavLink to={ v.redirect || v.path }>
          { v.meta.title }
        </NavLink>
      </AntdBreadcrumb.Item>
    })
  }

  const Breadcrumbs = generateBreadcrumbItem(matchedRoutes)
  
  return (
    <div>
      <AntdBreadcrumb id="breadcrumb">
        {Breadcrumbs}
      </AntdBreadcrumb>
      <style jsx>{`
        :global(#breadcrumb) {
          position: fixed;
          top: 64px;
          width: 100%;
          height: 50px;
          line-height: 50px;
          padding-left: 20px;
          z-index: 300;
          background-color: hsl(0deg, 0%, 98%);
          border-top: 1px solid hsl(0deg, 0%, 94%);
          border-bottom: 1px solid hsl(0deg, 0%, 94%);
        }
      `}</style>
    </div>
    
  )
}

export default Breadcrumb