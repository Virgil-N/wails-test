/**
 * Created Date: 2021-03-24 10:22:31
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-29 10:28:50
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'
import { Table, Modal, Button, Form, Input, Switch } from 'antd'
import { getPlayerList, addNewPlayer } from '@/store/reducers/player'
import ShowMsg from '@/utils/msg'

function useIsMountedRef() {
  const isMountedRef = useRef(null)
  useEffect(() => {
    isMountedRef.current = true
    return () => isMountedRef.current = false
  })
  return isMountedRef
}

function PlayerList() {
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
  const [visible, setVisible] = useState(() => {
    return false
  })
  const [loading, setLoading] = useState(() => {
    return false
  })

  const [form] = Form.useForm()

  const showModal = () => {
    form.resetFields()
    setLoading(false)
    setVisible(true)
  }

  const handleOk = async() => {
    if (isMountedRef.current) {
      const params = await form.validateFields()
      if (params) {
        setLoading(true)
        const res = await dispatch(addNewPlayer(params))
        console.log('===', res)
        if (res && res.error) {
          ShowMsg('error', res.error.message)
        }
        if (res && res.payload) {
          if (res.payload.code === 2000) {
            ShowMsg('success', res.payload.msg)
          } else {
            ShowMsg('error', res.payload.msg)
          }
        }
        setLoading(false)
        setVisible(false)
      }
    }
  }

  const handleCancel = () => {
    setVisible(false)
  }

  const dispatch = useDispatch()

  useDeepCompareEffect(() => {
    const getPlayers = async(params) => {
      const { payload } = await dispatch(getPlayerList({ ...params, ...listQuery }))
      if (payload && payload.code === 2000) {
        setTableData(payload.data)
      }
    }
    if (isMountedRef.current) {
      getPlayers()
    }
  }, [dispatch, listQuery])

  const changePage = async(page, pageSize) => {
    setListQuery({
      current: page,
      size: pageSize
    })
    const { payload } = await dispatch(getPlayerList({ ...listQuery }))
    if (payload && payload.code === 2000) {
      setTableData(payload.data)
    }
  }

  const changePageSize = async(current, size) => {
    setListQuery({
      current: current,
      size: size
    })
    const { payload } = await dispatch(getPlayerList({ ...listQuery }))
    if (payload && payload.code === 2000) {
      setTableData(payload.data)
    }
  }

  const columns = [
    {
      title: '玩家',
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
      key: 'age',
      render: (age) => {
        return age === 0 ? '' : age
      }
    },
    {
      title: '是否离开游戏',
      dataIndex: 'abandoned',
      key: 'abandoned',
      render: (abandoned) => {
        return abandoned ? '是' : '否'
      }
    },
    {
      title: '喜欢',
      dataIndex: 'love',
      key: 'love'
    },
    {
      title: '被喜欢',
      dataIndex: 'beloved',
      key: 'beloved'
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
    <div className="player-list-wrap">
      <Button type="primary" onClick={showModal}>
        新建玩家
      </Button>
      <Modal
        visible={visible}
        title="新建玩家"
        onOk={handleOk}
        onCancel={handleCancel}
        maskClosable={false}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            取消
          </Button>,
          <Button key="submit" type="primary" loading={loading} onClick={handleOk}>
            提交
          </Button>
        ]}
      >
        <Form form={form} name="loginForm" className="login-form" labelCol={{span: 4}}>
          <Form.Item label="玩家名称" name="name" rules={[{ required: true, message: '请输入玩家名称！' }]}>
            <Input placeholder="玩家名称"></Input>
          </Form.Item>
          <Form.Item label="玩家密码" name="password" rules={[{ required: true, message: '请输入密码！' }]}>
            <Input type="password" placeholder="密码"></Input>
          </Form.Item>
          <Form.Item label="是否离开" name="abandoned" valuePropName="checked" initialValue={false}>
            <Switch checkedChildren="离开" unCheckedChildren="继续"></Switch>
          </Form.Item>
        </Form>
      </Modal>
      <div className="player-list">
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
      </div>
      <style jsx>{`
        :global(.player-list-wrap > button) {
          margin: 20px 20px 0 20px;
        }
        .player-list {
          padding: 20px;
        }
      `}</style>
    </div>
  )
}

export default PlayerList