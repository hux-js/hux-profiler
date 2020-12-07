import React from 'react'
import styled from 'styled-components'

const ViewProfiler = styled.button`
  border: 1px solid #ed094a;
  border-radius: 3px;
  color: #ed094a;
  display: inline-block;
  font-size: 13px;
  font-weight: 400;
  line-height: 1rem;
  padding: 10px;
  text-decoration: none !important;
  text-transform: uppercase;
  transition: background 0.3s, color 0.3s;
  background: none;
  cursor: pointer;
  margin-left: auto;
  letter-spacing: 1.5px;
  :hover {
    background: #ed094a;
    color: #fff;
  }
`

const Link = styled.a`
  color: white;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
  line-height: 30px;
  font-size: 13px;
  margin-right: 1rem;
  :hover {
    color: #ed094a;
  }
`

const nav = {}

const Nav = ({ updateProfilerActive, profilerActive }) => {
  const handleViewProfilerClick = () => {
    updateProfilerActive(!profilerActive)
  }

  return (
    <nav style={nav}>
      <Link>Docs</Link>
      <ViewProfiler onClick={handleViewProfilerClick}>
        {profilerActive ? 'Hide profiler' : 'View profiler'}
      </ViewProfiler>
    </nav>
  )
}

export { Nav }
