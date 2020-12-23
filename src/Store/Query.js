/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import styled from 'styled-components'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-javascript'

import { MainHeader } from '../common/styles'

const Execute = styled.button`
  flex: 50%;
  margin: 1rem 0;
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

const code = `[
  "exampleKey",
  Filter("exampleKey2", ["exampleKey3=query string"])
]
`

const generateQuery = ({ query, Filter }) => {
  let formattedQuery = query;
  const filters = formattedQuery.match(/Filter\(\s*([^)]+?)\s*\)/g);

  filters.forEach(filter => {
    // eslint-disable-next-line no-new-func
    const filterObject = Function("Filter", `return ${filter}`)(Filter);
    formattedQuery = formattedQuery.replace(filter, JSON.stringify(filterObject))
  })

  return JSON.parse(formattedQuery)
}

const Query = ({ selectedBucket, updateQueryResult }) => {
  const { query, Filter } = window.__HUX_PROFILER_INTEROP_HOOK__({})

  const [editorCode, updateEditorCode] = useState(code)

  const handleExecuteQuery = () => {
    const execute = async () => {
      const response = await query({
        name: selectedBucket,
        query: generateQuery({ query: editorCode, Filter }),
        fromProfiler: true,
      })
      updateQueryResult(response)
    }

    execute()
  }

  return selectedBucket === 'default' ? (
    <MainHeader>No bucket selected</MainHeader>
  ) : (
    <div>
      <Editor
        value={editorCode}
        onValueChange={(code) => updateEditorCode(code)}
        highlight={(code) => highlight(code, languages.js)}
        style={{
          fontFamily: '"Fira code", "Fira Mono", monospace',
          fontSize: 12
        }}
      />
      <Execute onClick={handleExecuteQuery}>Execute query</Execute>
    </div>
  )
}

export { Query }
