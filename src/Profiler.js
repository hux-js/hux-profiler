import React from 'react'
import styled from 'styled-components'

import { SubNav } from './common/header/SubNav'
import { Events } from './Events/Events'
import { Store } from './Store/Store'
import { Analytics } from './Analytics/Analytics'

const ProfilerView = styled.div`
  width: 100%;
  height: 100%;
`

const Profiler = () => {
  return (
    <ProfilerView>
      <SubNav
        render={(selectedTab) => {
          switch (selectedTab) {
            case 'events':
              return <Events />
            case 'store':
              return <Store />
            case 'analytics':
              return <Analytics />
          }
        }}
      />
    </ProfilerView>
  )
}

export { Profiler }
