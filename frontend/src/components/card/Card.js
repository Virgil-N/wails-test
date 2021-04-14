/**
 * Created Date: 2020-12-24 10:53:12
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-02-01 11:47:13
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2020 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Card as AntCard } from 'antd'
import variables from '@/styles/variables.module.scss'

function Card(props) {
  return (
    <div className="card-wrap">
      <AntCard title={props.title} headStyle={props.headStyle} bodyStyle={props.bodyStyle}>
        {props.content}
      </AntCard>
      <style jsx>{`
        .card-wrap > :global(.ant-card-bordered) {
          border-color: ${variables.cardBorderColor};
        }
      `}</style>
    </div>
  )
}

Card.propTypes = {
  title: PropTypes.string,
  headStyle: PropTypes.object,
  bodyStyle: PropTypes.object,
  content: PropTypes.object
}

export default Card