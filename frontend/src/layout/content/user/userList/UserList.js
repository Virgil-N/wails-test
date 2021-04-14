/**
 * Created Date: 2021-01-07 08:52:16
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-02-23 03:54:44
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { Table } from 'antd'
import { getUserList } from '@/store/reducers/user'

function useIsMountedRef() {
  const isMountedRef = useRef(null)
  useEffect(() => {
    isMountedRef.current = true
    return () => isMountedRef.current = false
  })
  return isMountedRef
}

function UserList() {
  const isMountedRef = useIsMountedRef()
  const [listQuery, setListQuery] = useState(() => {
    return {
      current: 1,
      size: 10
    }
  })
  const [tableData, setTableData] = useState(() => {
    return {}
  })

  const dispatch = useDispatch()

  useDeepCompareEffect(() => {
    const getUsers = async(params) => {
      const { payload } = await dispatch(getUserList({ ...params, ...listQuery }))
      if (payload && payload.code === 2000) {
        setTableData(payload.data)
      }
    }
    if (isMountedRef.current) {
      getUsers()
    }
  }, [dispatch, listQuery])

  const changePage = async(page, pageSize) => {
    setListQuery({
      current: page,
      size: pageSize
    })
    const { payload } = await dispatch(getUserList({ ...listQuery }))
    if (payload && payload.code === 2000) {
      setTableData(payload.data)
    }
  }

  const changePageSize = async(current, size) => {
    setListQuery({
      current: current,
      size: size
    })
    const { payload } = await dispatch(getUserList({ ...listQuery }))
    if (payload && payload.code === 2000) {
      setTableData(payload.data)
    }
  }

  const columns = [
    {
      title: '用户名',
      dataIndex: 'name',
      key: 'name'
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password'
    },
    {
      title: '年龄',
      dataIndex: 'age',
      key: ''
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt'
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt'
    }
  ]
  
  return (
    <div className="user-list">
      <Table
        columns={columns}
        dataSource={tableData.data}
        rowKey={record => record.id}
        pagination={{
          pageSize: tableData.pageSize,
          total: tableData.total,
          current: tableData.current,
          showSizeChanger: true,
          showQuickJumper: true,
          showTotal: total => `共 ${total} 页`,
          size: 'default',
          onChange: changePage,
          onShowSizeChange: changePageSize
        }}
        size="middle" />
      <style jsx>{`
        .user-list {
          padding: 20px;
        }
      `}</style>
    </div>
  )
}

export default UserList