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
  float: left;
  color: ${(props) => (props.selected ? 'white' : '#964193')};
`

const EventView = styled.div`
  max-height: ${(props) => (props.selected ? '300px' : '48px')};
  overflow-y: hidden;
  transition: max-height 0.3s ease;
`

const EventSummary = styled.div`
  font-size: 12px;
  color: ${(props) => (props.selected ? 'white' : '#293238')};
  background: ${(props) => (props.selected ? '#964193' : 'white')};
  border-bottom: 1px solid #eee;
  padding: 1rem;
  cursor: pointer;
  display: flex;
`

const SubEventSummary = styled.div`
  font-size: 12px;
  color: #293238;
  background: ${(props) => (props.selected ? '#f3f0ff' : 'white')};
  border-bottom: 1px solid #eee;
  padding: 1rem;
  cursor: pointer;
  display: flex;
`

const SubEventTree = styled.div`
  float: left;
  margin-top: -50px;
  width: 2rem;
  height: 57px;
  border-left: 1px solid ${(props) => (props.selected ? '#964193' : 'white')};
  border-bottom: 1px solid ${(props) => (props.selected ? '#964193' : 'white')};
  margin-right: 1rem;
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
  const [selectedSubIndex, updateSelectedSubIndex] = useState()

  setInterval(() => {
    if (
      Object.keys(window.__HUX_PROFILER_EVENTS__.events).length !==
      Object.keys(trackedEvents).length
    ) {
      updateTrackedEvents(window.__HUX_PROFILER_EVENTS__.events)
    }
  }, 2000)

  const handleSelectEvent = ({ index, event }) => {
    updateSelectedEvent(event)
    updateSelectedIndex(index)
    updateSelectedSubIndex()
  }

  const handleSelectSubEvent = ({ index, event }) => {
    updateSelectedEvent(event)
    updateSelectedSubIndex(index)
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

        {Object.keys(trackedEvents)
          .reverse()
          .map((eventId, index) => {
            const event = trackedEvents[eventId]
            const eventKeys = Object.keys(event)
            const parentEvent = event[eventKeys[0]]
            const subEventKeys = eventKeys.slice(1)

            return parentEvent && parentEvent.details ? (
              <EventView
                selected={eventKeys[0] === selectedIndex}
                key={`event-${index}`}
              >
                <EventSummary
                  index={index}
                  selected={eventKeys[0] === selectedIndex}
                  onClick={() =>
                    handleSelectEvent({
                      index: eventKeys[0],
                      event: parentEvent
                    })
                  }
                >
                  <Column>
                    <EventType selected={eventKeys[0] === selectedIndex}>
                      {parentEvent.type}
                    </EventType>
                  </Column>
                  <Column>{parentEvent.details.bucketName}</Column>
                  <Column>
                    <i>{parentEvent.steps.entire}ms</i>
                  </Column>
                </EventSummary>

                {subEventKeys.map((subEventKey, subIndex) => {
                  return (
                    <SubEventSummary
                      key={`sub-event-${subIndex}`}
                      index={subIndex}
                      selected={
                        subEventKey === selectedSubIndex &&
                        eventKeys[0] === selectedIndex
                      }
                      onClick={() =>
                        handleSelectSubEvent({
                          index: subEventKey,
                          event: event[subEventKey]
                        })
                      }
                    >
                      <Column>
                        <SubEventTree
                          selected={eventKeys[0] === selectedIndex}
                        />
                        <EventType>{event[subEventKey].type}</EventType>
                      </Column>
                      <Column />
                      <Column>
                        <i>{event[subEventKey].steps.entire}ms</i>
                      </Column>
                    </SubEventSummary>
                  )
                })}
              </EventView>
            ) : null
          })}
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
