import React from 'react'
import { Header, MainHeader, EventView } from '../common/styles'
import { getMetricRating } from '../config/metricBounds'

const ApiEvent = ({ event }) => {
  const rating = getMetricRating({
    time: event.steps.entire,
    type: 'api',
    size: event.memorySize
  })

  return (
    <EventView>
      {event && (
        <div>
          <MainHeader>{event.type} event</MainHeader>
          <Header>Details</Header>
          <div>
            <b>URL</b> {event.details.url}
          </div>
          {event.type === 'HYDRATE' && (
            <div>
              <b>Data from</b> {event.details.dataFrom}
            </div>
          )}
          {event.details.dataFrom !== 'Cache' && (
            <div>
              <div>
                <b>Method</b> {event.details.options.method}
              </div>
              <div>
                <b>Status</b> {event.details.status}
              </div>
            </div>
          )}
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
        </div>
      )}
    </EventView>
  )
}

export { ApiEvent }
