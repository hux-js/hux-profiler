import React, { useState } from 'react'
import styled from 'styled-components'

const SubNavView = styled.nav`
  height: 100%;
`

const Tabs = styled.div`
  display: flex;
`

const Tab = styled.div`
  flex: 7%;
  padding: 1rem 1rem;
  border-bottom: 3px solid ${(props) => (props.selected ? '#ed094a' : '#eee')};
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  text-align: center;
  cursor: pointer;
`
const Spacer = styled.div`
  flex: 70%;
  padding: 1rem 2rem;
  border-bottom: 3px solid #eee;
`

const SubNav = ({ render }) => {
  const [selectedTab, updateSelectedTab] = useState('events')

  return (
    <SubNavView>
      <Tabs>
        <Tab
          selected={selectedTab === 'events'}
          onClick={() => updateSelectedTab('events')}
        >
          Events
        </Tab>
        <Tab
          selected={selectedTab === 'store'}
          onClick={() => updateSelectedTab('store')}
        >
          Store
        </Tab>
        <Tab
          selected={selectedTab === 'analytics'}
          onClick={() => updateSelectedTab('analytics')}
        >
          Analytics
        </Tab>
        <Spacer />
      </Tabs>
      {render(selectedTab)}
    </SubNavView>
  )
}

export { SubNav }
