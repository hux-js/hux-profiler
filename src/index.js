import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import { Profiler } from './profiler'
import { Header } from './common/header'

const ProfilerContainer = styled.div`
  background: white;
  transition: height 0.3s ease, position 2s 2s;
  overflow: hidden;
  height: ${(props) => (props.profilerActive ? '50vmin' : '0')};
  position: ${(props) =>
    props.triggerPositionDelay ? 'absolute' : 'relative'};
  left: 0;
  right: 0;
  z-index: 99999999999;
  box-shadow: ${(props) =>
    props.profilerActive ? '0 8px 6px -6px black' : '0'};
`

export const HuxProfiler = () => {
  window.__HUX_PROFILER_ENABLED__ = true

  const [profilerActive, updateProfilerActive] = useState(false)
  const [triggerPositionDelay, updateTriggerPositionDelay] = useState(false)

  useEffect(() => {
    if (!profilerActive) {
      setTimeout(() => {
        updateTriggerPositionDelay(false)
      }, 300)
    } else {
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
        profilerActive={profilerActive}
        triggerPositionDelay={triggerPositionDelay}
      >
        <Profiler />
      </ProfilerContainer>
    </div>
  )
}
