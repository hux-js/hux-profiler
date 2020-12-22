import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import ReactJson from 'react-json-view'

import { Query } from './Query'
import { Hydrate } from './Hydrate'
import { Select } from '../common/styles'

const StoreView = styled.div`
  display: flex;
  height: 100%;
`

const InnerMenu = styled.div``

const InnerMenuItem = styled.div`
  padding: 0.5rem 1rem;
  cursor: pointer;

  &:hover {
    color: #ed094a;
  }

  &.selected {
    border-right: 3px solid #ed094a;
  }
`

const Menu = styled.div`
  background: #465259;
  flex: 15%;
  color: white;
  font-weight: 500;
  line-height: 30px;
  font-size: 12px;
`

const Left = styled.div`
  border-right: 2px solid #eee;
  flex: 35%;
  line-height: 20px;
  padding: 1rem;
`

const Right = styled.div`
  flex: 50%;
  padding: 1rem;
  overflow-y: scroll;
  height: calc(100% - 80px);
`

const Store = () => {
  const { buckets: huxBuckets, query } = window.__HUX_PROFILER_INTEROP_HOOK__({})

  const [menuSelection, updateMenuSelection] = useState('query')
  const [queryResult, updateQueryResult] = useState({})
  const [buckets, updateBuckets] = useState([])
  const [selectedBucket, updateSelectedBucket] = useState('default')

  useEffect(() => {
    if (huxBuckets) {
      updateBuckets(Object.keys(huxBuckets))
    }
  }, [huxBuckets])

  const handleBucketSelection = async (event) => {
    updateSelectedBucket(event.target.value)
    updateMenuSelection('query')

    if (event.target.value !== 'default') {
      const response = await query({
        name: event.target.value,
        query: [],
        fromProfiler: true
      })

      updateQueryResult(response)
    } else {
      updateQueryResult({})
    }
  }

  return (
    <StoreView>
      <Menu>
        <Select
          selectedBucket={selectedBucket}
          onChange={handleBucketSelection}
        >
          <option value='default'>Select bucket</option>
          {buckets.map((bucket) => (
            <option key={bucket} value={bucket}>
              {bucket}
            </option>
          ))}
        </Select>

        {selectedBucket !== 'default' && (
          <InnerMenu>
            <InnerMenuItem
              className={menuSelection === 'query' && 'selected'}
              onClick={() => updateMenuSelection('query')}
            >
              Query
            </InnerMenuItem>
            <InnerMenuItem
              className={menuSelection === 'hydrate' && 'selected'}
              onClick={() => updateMenuSelection('hydrate')}
            >
              Hydrate
            </InnerMenuItem>
          </InnerMenu>
        )}
      </Menu>

      <Left>
        {menuSelection === 'query' ? (
          <Query
            updateQueryResult={updateQueryResult}
            selectedBucket={selectedBucket}
          />
        ) : (
          <Hydrate
            updateQueryResult={updateQueryResult}
            selectedBucket={selectedBucket}
          />
        )}
      </Left>

      <Right>
        <ReactJson
          theme={{
            base00: 'white',
            base01: '#ddd',
            base02: '#ddd',
            base03: '#444',
            base04: '#ccc',
            base05: '#444',
            base06: '#444',
            base07: '#444',
            base08: '#444',
            base09: '#964193',
            base0A: '#964193',
            base0B: '#964193',
            base0C: '#964193',
            base0D: '#964193',
            base0E: '#964193',
            base0F: '#964193'
          }}
          enableClipboard={false}
          displayDataTypes={false}
          name={selectedBucket}
          src={queryResult}
          groupArraysAfterLength={30}
        />
      </Right>
    </StoreView>
  )
}

export { Store }
