/**
 * Created Date: 2021-01-13 10:46:29
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-25 02:45:16
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { Layout, Dropdown, Menu } from 'antd'
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined
} from '@ant-design/icons'
import { resetAppState, setDefaultOpenKeys, setDefaultSelectedKeys, setCollapsed } from '@/store/reducers/appState'
import avator from '@/assets/images/avator.jpeg'
import { userLogout, setAccessToken, setRefreshToken, setUserLoginState } from '@/store/reducers/user'
import ShowMsg from '@/utils/msg'

const { Header: AntdHeader } = Layout

function Header() {
  let history = useHistory()
  const collapsed = useSelector((state) => {
    return state.appState.collapsed
  })

  const dispatch = useDispatch()
  const onCollapse = collapsed => {
    dispatch(setCollapsed(collapsed))
  }
  const selectMenu = () => {
    dispatch(setDefaultSelectedKeys(['userFile']))
    dispatch(setDefaultOpenKeys(['user']))
  }

  const logout = async() => {
    const res = await dispatch(userLogout())
    if (res && res.error) {
      ShowMsg('error', res.error.message)
    } else {
      if (res && res.payload && res.payload.code === 2000) {
        dispatch(setAccessToken(null))
        dispatch(setRefreshToken(null))
        dispatch(setUserLoginState(false))
        dispatch(resetAppState())
      }
      history.push('/login')
    }
  }

  const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/main/user/file" onClick={selectMenu}>个人资料</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <a target="_blank" rel="noopener noreferrer" href="http://www.taobao.com/">
          淘宝
        </a>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="3" onClick={logout}>
        注销
      </Menu.Item>
    </Menu>
  )

  return (
    <AntdHeader id="header" className={collapsed ? "collapsed": "expand"}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        id: 'sidebar-trigger',
        onClick: () => onCollapse(!collapsed),
      })}
      <Dropdown className="dropdown" overlay={menu} trigger={['click']}>
        <img className="avator" src={avator} alt=""/>
      </Dropdown>
      <style jsx>{`
        :global(#header) {
          position: fixed;
          padding: 0;
          z-index: 300;
          width: 100%;
          background-color: #ffffff;
        }
        :global(#sidebar-trigger) {
          font-size: 18px;
          line-height: 64px;
          padding: 0 24px;
          cursor: pointer;
        }
        :global(#header .dropdown) {
          position: fixed;
          top: 0;
          right: 15px;
        }
        :global(#header .dropdown:hover) {
          cursor: pointer;
        }
        .avator {
          width: 64px;
          height: 64px;
        }
      `}</style>
    </AntdHeader>
  )
}

export default Header