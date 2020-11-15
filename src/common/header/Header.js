import React from 'react'
import styled from 'styled-components'

import { Nav } from './Nav'

const HeaderContainer = styled.header`
  background: #293238;
  padding: 0.75rem;
  text-align: left;
  display: flex;
  justify-content: space-between;
`

const Header = ({ updateProfilerActive, profilerActive }) => {
  return (
    <HeaderContainer>
      <svg
        xmlns='http://www.w3.org/2000/svg'
        viewBox='0 0 94.1 87.1'
        width='25px'
      >
        <defs>
          <clipPath id='_clipPath_FEmJzpvF2QZswh2jGdMBlIQg82FIULdQ'>
            <rect width='94.1' height='87.1' />
          </clipPath>
        </defs>
        <g clipPath='url(#_clipPath_FEmJzpvF2QZswh2jGdMBlIQg82FIULdQ)'>
          <g>
            <path
              d=' M 66.5 38.53 L 93.25 74.53 L 63.01 74.53 L 51.33 57.53 L 48.33 52.71 M 65.03 0.57 L 91.63 0.57 M 30.44 28.64 L 9.44 0.57 L 39.81 0.57 L 48.02 12.66'
              fill='rgb(255,255,255)'
            />
            <path
              d=' M 70.58 29.81 L 59.88 29.81 L 93.02 0.61 L 66.02 0.61 L 32.7 32.61 L 45.85 33 L 0 86 L 70.58 29.81 Z '
              fill='rgb(230,23,76)'
            />
          </g>
        </g>
      </svg>

      <Nav
        updateProfilerActive={updateProfilerActive}
        profilerActive={profilerActive}
      />
    </HeaderContainer>
  )
}

export { Header }
