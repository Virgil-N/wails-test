/**
 * Created Date: 2021-03-24 10:22:38
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-24 03:27:15
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React, { useState, useRef, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useDeepCompareEffect from 'use-deep-compare-effect'

function useIsMountedRef() {
  const isMountedRef = useRef(null)
  useEffect(() => {
    isMountedRef.current = true
    return () => isMountedRef.current = false
  })
  return isMountedRef
}

function PlayerResult() {
  
  return (
    <div className="player-file">
      <p>123456</p>
      <style jsx>{`
        .player-file {
          padding: 20px;
        }
      `}</style>
    </div>
  )
}

export default PlayerResult