import React from 'react'
import styled from 'styled-components'
import ReactJson from 'react-json-view'
import { getMetricRating } from '../config/metricBounds'
import { Header, MainHeader, EventView } from '../common/styles'

const EventTimeline = styled.div`
  border-radius: 3px;
  background: #e5deff;
  width: 100%;
  overflow: hidden;
  height: 30px;
  margin-bottom: 0.25rem;
`

const Data = styled.div`
  background: #f3f0ff;
  width: ${(props) => props.width}%;
  height: 30px;
`

const DataText = styled.span`
  font-style: italic;
  color: #68757d;
  font-size: 10px;
`

const EventTimelineLabel = styled.div`
  display: flex;
  margin-bottom: 1rem;
  line-height: 15px;
`

const DataLabel = styled.div`
  color: #68757d;
  flex: ${(props) => props.width}%;
  height: 30px;
`

const QueryEvent = ({ event }) => {
  const width = event && (event.steps.internal / event.steps.entire) * 100
  const rating = getMetricRating({
    time: event.steps.entire,
    type: 'query',
    size: event.memorySize
  })

  return (
    <EventView>
      {event && (
        <div>
          <MainHeader>Query event</MainHeader>
          <EventTimeline>
            <Data width={width} />
          </EventTimeline>
          <EventTimelineLabel>
            <DataLabel width={width}>
              |
              <br />
              <DataText>{event.steps.internal}ms</DataText>
            </DataLabel>
            <DataLabel width={100 - width}>
              |
              <br />
              <DataText>
                {(event.steps.entire - event.steps.internal).toFixed(3)}ms
              </DataText>
            </DataLabel>
          </EventTimelineLabel>
          <Header>Details</Header>
          <div>
            <b>Bucket</b> {event.details.bucketName}
          </div>
          <div>
            <b>Time of event</b> {event.eventTime}
          </div>
          <Header>Performance</Header>
          <div>
            <b>Rating </b>
            {rating}
          </div>
          <div>
            <b>Details </b>
            {event.memorySize} bytes processed in {event.steps.entire}ms
          </div>
          <Header>Request</Header>
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
            name='query'
            src={event.details.query}
            displayObjectSize={false}
          />
        </div>
      )}
    </EventView>
  )
}

export { QueryEvent }
