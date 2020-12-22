/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import styled from 'styled-components'
import ReactJson from 'react-json-view'

import { Select } from '../common/styles'

const HydrateButton = styled.button`
  flex: 50%;
  margin: 2rem 0.5rem 0.5rem 1rem;
  border: 1px solid #ed094a;
  border-radius: 3px;
  color: #ed094a;
  display: inline-block;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-size: 11px;
  padding: 10px;
  text-decoration: none !important;
  text-transform: uppercase;
  transition: background 0.3s, color 0.3s;
  background: none;
  cursor: pointer;
  :hover {
    background: #ed094a;
    color: #fff;
  }
`

const dataTypes = {
  string: () => Math.random().toString(36).substring(7),
  number: () => Math.floor(Math.random() * 100 + 1),
  integer: () => Math.floor(Math.random() * 100 + 1),
  boolean: () => Math.random() <= 0.5,
  array: () => [],
  object: () => ({})
}

const generateDataFromSchema = ({ schema }) => {
  const recursiveDataGenerator = ({ subSchema }) => {
    const newData = {}
    const properties = subSchema.properties
    const keys = Object.keys(properties)

    keys.forEach((key) => {
      if (properties[key].type) {
        if (properties[key].type === 'object' && properties[key].properties) {
          newData[key] = recursiveDataGenerator({ subSchema: properties[key] })
        } else if (
          properties[key].type === 'array' &&
          properties[key].properties
        ) {
          newData[key] = [
            recursiveDataGenerator({ subSchema: properties[key] })
          ]
        } else {
          newData[key] = dataTypes[properties[key].type]()
        }
      }
    })

    return newData
  }

  return schema.properties
    ? recursiveDataGenerator({ subSchema: schema })
    : dataTypes[schema.type]()
}

const Hydrate = ({ selectedBucket, updateQueryResult }) => {
  const { sync, buckets } = window.__HUX_PROFILER_INTEROP_HOOK__({})

  const [selectedMode, updateSelectedMode] = useState('merge')
  const { schema } = buckets[selectedBucket] || {}

  const data = generateDataFromSchema({ schema })
  const [editorCode, updateEditorCode] = useState(data)

  const handleHydrateStore = () => {
    const execute = async () => {
      const response = await sync({
        name: selectedBucket,
        data: editorCode,
        mode: selectedMode,
        fromProfiler: true,
      })

      updateQueryResult(response)
    }

    execute()
  }

  const handleModeSelection = (event) => {
    updateSelectedMode(event.target.value)
  }

  return (
    <div>
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
        onEdit={(data) => {
          updateEditorCode(data.updated_src)
          return true
        }}
        onAdd={(data) => {
          updateEditorCode(data.updated_src)
          return true
        }}
        onDelete={(data) => {
          updateEditorCode(data.updated_src)
          return true
        }}
        enableClipboard={false}
        displayDataTypes={false}
        name='data'
        src={editorCode}
        groupArraysAfterLength={30}
      />
      <Select
        className='light'
        selectedMode={selectedMode}
        onChange={handleModeSelection}
      >
        <option value='merge'>Merge</option>
        <option value='replace'>Replace</option>
      </Select>
      <HydrateButton onClick={handleHydrateStore}>Hydrate store</HydrateButton>
    </div>
  )
}

export { Hydrate }
