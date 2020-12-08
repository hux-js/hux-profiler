import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Profiler } from './profiler'
import { Header } from './common/header'

const ProfilerContainer = styled.div`
  width: 100%;
  color: #293238;
  text-align: left;
  background: white;
  transition: height 0.3s ease, position 2s 2s;
  overflow: hidden;
  position: ${(props) =>
    props.triggerPositionDelay ? 'absolute' : 'relative'};
  left: 0;
  right: 0;
  z-index: 99999999999;
  box-shadow: ${(props) =>
    props.profilerActive ? '0 8px 6px -6px black' : '0'};
  resize: vertical;
  border-bottom: 2px solid #ed094a;
`

export const HuxProfiler = () => {
  window.__HUX_PROFILER_ENABLED__ = { state: true }

  const [profilerActive, updateProfilerActive] = useState(false)
  const [triggerPositionDelay, updateTriggerPositionDelay] = useState(false)

  useEffect(() => {
    const el = document.getElementById('profiler-container')

    if (!profilerActive) {
      el.style.height = '0'
      setTimeout(() => {
        updateTriggerPositionDelay(false)
      }, 300)
    } else {
      const el = document.getElementById('profiler-container')
      el.style.height = '50vmin'
      updateTriggerPositionDelay(true)
    }
  }, [profilerActive])

  return (
    <div>
      <Header
        updateProfilerActive={updateProfilerActive}
        profilerActive={profilerActive}
      />
      <ProfilerContainer
        id='profiler-container'
        profilerActive={profilerActive}
        triggerPositionDelay={triggerPositionDelay}
      >
        <Profiler />
      </ProfilerContainer>
    </div>
  )
}
