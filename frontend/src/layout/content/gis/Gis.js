/**
 * Created Date: 2021-02-22 09:48:21
 * Author: Virgil-N
 * Description:
 * -----
 * Last Modified: 2021-03-22 03:28:03
 * Modified By: Virgil-N (lieut9011@126.com)
 * -----
 * Copyright (c) 2019 - 2021 ⚐
 * Virgil-N will save your soul!
 * -----
 */

import React, { useEffect, useRef, useCallback } from 'react'
import { useSelector } from 'react-redux'
import 'ol/ol.css'
import { Map, View } from 'ol'
import TileLayer from 'ol/layer/Tile'
import OSM from 'ol/source/OSM'

function useIsMountedRef() {
  const isMountedRef = useRef(null)
  useEffect(() => {
    isMountedRef.current = true
    return () => isMountedRef.current = false
  })
  return isMountedRef
}

function Gis() {
  const isMountedRef = useIsMountedRef()
  const mapRef = useRef(null)

  const collapsed = useSelector((state) => {
    return state.appState.collapsed
  })

  const initMap = useCallback((elem) => {
    mapRef.current = new Map({
      target: elem,
      layers: [
        new TileLayer({
          source: new OSM()
        })
      ],
      view: new View({
        center: [0, 0],
        zoom: 0
      })
    })
  }, [mapRef])

  useEffect(() => {
    if (isMountedRef.current) {
      const mapElem = document.querySelector('#map')
      if (mapElem && !mapRef.current) {
        const mapWidth = mapElem.getBoundingClientRect().width
        const mapHeight = mapElem.getBoundingClientRect().height
        initMap(mapElem, mapWidth, mapHeight)
      }
      // 如果页面节点未及时更新，尝试使用下面方案更新map
      document.onreadystatechange = () => {
        if (mapRef.current !== null) {
          mapRef.current.updateSize()
        }
      }
      if (mapRef.current !== null) {
        mapRef.current.updateSize()
        if (collapsed) {
          mapRef.current.setSize([mapElem.getBoundingClientRect().width + 120, mapElem.getBoundingClientRect().height])
        } else {
          mapRef.current.setSize([mapElem.getBoundingClientRect().width - 120, mapElem.getBoundingClientRect().height])
        }
      }
    }
  }, [initMap, isMountedRef, mapRef, collapsed])

  return (
    <div id="map">
      <style jsx>{`
        #map {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </div>
  )
}

export default Gis
