import React, { useState } from 'react'
import styled from 'styled-components'
import { Search } from 'react-feather'

import { QueryEvent } from './QueryEvent'
import { ApiEvent } from './ApiEvent'

const EventsView = styled.div`
  display: flex;
  height: 100%;
`

const Left = styled.div`
  border-right: 2px solid #eee;
  flex: 50%;
  height: 100%;
  overflow-y: scroll;
`

const Right = styled.div`
  flex: 50%;
  height: 100%;
`

const FilterBar = styled.div`
  margin-left: auto;
  text-align: right;
  padding: 1rem;
`

const Column = styled.div`
  flex: 33%;
`

const EventType = styled.b`
  color: ${(props) => (props.selected ? 'white' : '#964193')};
`

const EventView = styled.div``

const EventSummary = styled.div`
  font-size: 12px;
  color: ${(props) => (props.selected ? 'white' : '#293238')};
  background: ${(props) => (props.selected ? '#964193' : 'white')};
  border-bottom: 1px solid #eee;
  padding: 1rem;
  cursor: pointer;
  display: flex;
`

const EventHeader = styled.div`
  text-transform: uppercase;
  letter-spacing: 1.5px;
  font-weight: 500;
  font-size: 11px;
  color: #293238;
  background: white;
  padding: 1rem;
  display: flex;
  border-bottom: 2px solid #eee;
`

if (!window.__HUX_PROFILER_EVENTS__) {
  window.__HUX_PROFILER_EVENTS__ = {
    events: []
  }
}

const Events = () => {
  const [selectedEvent, updateSelectedEvent] = useState()
  const [trackedEvents, updateTrackedEvents] = useState(
    window.__HUX_PROFILER_EVENTS__.events
  )
  const [selectedIndex, updateSelectedIndex] = useState()

  setInterval(() => {
    if (window.__HUX_PROFILER_EVENTS__.events.length !== trackedEvents.length) {
      updateTrackedEvents(window.__HUX_PROFILER_EVENTS__.events)
    }
  }, 2000)

  const handleSelectEvent = ({ index, event }) => {
    updateSelectedEvent(event)
    updateSelectedIndex(index)
  }

  return (
    <EventsView>
      <Left>
        {/* <FilterBar>
          <Search />
        </FilterBar> */}
        <EventHeader index={1}>
          <Column>Event type</Column>
          <Column>Bucket</Column>
          <Column>Execution time</Column>
        </EventHeader>

        {trackedEvents.map((event, index) => (
          <EventView key={`event-${index}`}>
            <EventSummary
              index={index}
              selected={index === selectedIndex}
              onClick={() => handleSelectEvent({ index, event })}
            >
              <Column>
                <EventType selected={index === selectedIndex}>
                  {event.type}
                </EventType>
              </Column>
              <Column>{event.details.bucketName}</Column>
              <Column>
                <i>{event.steps.entire}ms</i>
              </Column>
            </EventSummary>
          </EventView>
        ))}
      </Left>

      <Right>
        {selectedEvent ? (
          selectedEvent.type === 'QUERY' ? (
            <QueryEvent event={selectedEvent} />
          ) : (
            <ApiEvent event={selectedEvent} />
          )
        ) : null}
      </Right>
    </EventsView>
  )
}

export { Events }
