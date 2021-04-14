/**
 * Created Date: 2020-12-30 01:57:35
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-25 10:29:38
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React, { useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { Menu, Layout } from 'antd'
import sidebarImg from '@/assets/images/logo.png'
import { setDefaultOpenKeys, setDefaultSelectedKeys } from '@/store/reducers/appState'

const { Sider } = Layout
const { SubMenu } = Menu

function Sidebar(props) {
  const appState = useSelector((state) => {
    return state.appState
  })

  const dispatch = useDispatch()
  const selectMenu = (e) => {
    console.log(props, e)
    dispatch(setDefaultSelectedKeys([e.key]))
  }

  const openCloseMenu  = (e) => {
    dispatch(setDefaultOpenKeys(e))
  }

  const generateSidebarItem = (menu) => {
    let content = '<div></div>'
    if (menu.children && menu.children instanceof Array && menu.children.length > 0) {
      content = menu.children.map(item => {
        return generateSidebarItem(item)
      })
      return <SubMenu key={menu.name} icon={<menu.meta.icon />} title={menu.meta.title || ''}>{content}</SubMenu>
    } else {
      if (menu.meta.hide) {
        return
      }
      return <Menu.Item key={menu.name} icon={<menu.meta.icon />} title={menu.meta.title || ''} onClick={selectMenu}>
        <NavLink to={ menu.path }>
          { menu.meta.title }
        </NavLink>
      </Menu.Item>
    }
  }

  return (
    <Sider id="sider" collapsible collapsed={appState.collapsed} trigger={null}>
      <div className="logo-wrap">
        <img className="logo-img" src={sidebarImg} alt={process.env.REACT_APP_PROJECT_NAME} />
        <span className={appState.collapsed ? "hide" : "app-name"}>{process.env.REACT_APP_PROJECT_NAME}</span>
      </div>
      <Menu
        theme="light"
        mode="inline"
        defaultSelectedKeys={appState.defaultSelectedKeys}
        defaultOpenKeys={appState.defaultOpenKeys}
        selectedKeys={appState.defaultSelectedKeys}
        onOpenChange={openCloseMenu}
      >
        {props.routeList.map(menu => {
          if (menu.children && menu.children instanceof Array && menu.children.length > 0) {
            return generateSidebarItem(menu)
          } else {
            if (menu.meta.hide) {
              return
            }
            return <Menu.Item key={menu.name} icon={<menu.meta.icon />} title={menu.meta.title || ''} onClick={selectMenu}>
              <NavLink to={ menu.path }>
                { menu.meta.title }
              </NavLink>
            </Menu.Item>
          }
        })}
      </Menu>
      <style jsx>{`
        :global(#sider) {
          background-color: #ffffff;
        }
        .logo-wrap {
          height: 64px;
          display: grid;
          grid-template-columns: 80px auto;
        }
        .logo-wrap img {
          width: 64px;
          margin: 0 8px;
          height: 64px;
        }
        .app-name {
          height: 64px;
          line-height: 64px;
          text-align: center;
        }
      `}</style>
    </Sider>
  )
}

Sidebar.defaultProps = {
  routerList: []
}

Sidebar.propTypes = {
  routeList: PropTypes.array
}

export default Sidebar