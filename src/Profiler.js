import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

const ProfilerView = styled.div`
  padding: 2rem;
`

const Profiler = () => {
  const [trackedEvents, updateTrackedEvents] = useState([])

  useEffect(() => {
    if (window.__HUX_PROFILER_EVENTS__) {
      updateTrackedEvents(window.__HUX_PROFILER_EVENTS__.reverse())
    }
  }, [window.__HUX_PROFILER_EVENTS__])

  return (
    <ProfilerView>
      {trackedEvents.map(
        (event) =>
          `Type: ${event.type} | Execution time: ${event.executionTime} | Memory size: ${event.memorySize}`
      )}
    </ProfilerView>
  )
}

export { Profiler }
