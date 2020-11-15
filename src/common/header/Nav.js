import React from 'react'
import styled from 'styled-components'

const ViewProfiler = styled.button`
  border: 1px solid #ed094a;
  border-radius: 3px;
  color: #ed094a;
  display: inline-block;
  font-size: 14px;
  font-weight: 400;
  line-height: 1.2em;
  padding: 10px;
  text-decoration: none !important;
  text-transform: uppercase;
  transition: background 0.3s, color 0.3s;
  background: none;
  cursor: pointer;
  margin-left: auto;
  :hover {
    background: #ed094a;
    color: #fff;
  }
`

const nav = {}

const Nav = ({ updateProfilerActive, profilerActive }) => {
  const handleViewProfilerClick = () => {
    updateProfilerActive(!profilerActive)
  }

  return (
    <nav style={nav}>
      <ViewProfiler onClick={handleViewProfilerClick}>
        {profilerActive ? 'Hide profiler' : 'View profiler'}
      </ViewProfiler>
    </nav>
  )
}

export { Nav }
