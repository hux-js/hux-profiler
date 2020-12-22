import React, { useEffect } from 'react'
import styled from 'styled-components'
import Chart from 'chart.js'

const AnalyticsView = styled.div`
  width: 100%;
  padding: 1rem;
  height: 300px;
`

const MemoryChart = styled.canvas`
  height: 100px;
  width: 97%;
`

const Analytics = () => {
  const { getBucketsMemorySize } = window.__HUX_PROFILER_INTEROP_HOOK__({})

  const updateChart = async ({ chart }) => {
    const bucketsMemoryUsage = await getBucketsMemorySize()

    chart.data.datasets.forEach((dataset) => {
      dataset.data = bucketsMemoryUsage
    })

    chart.update()
  }

  useEffect(() => {
    const ctx = document.getElementById('myChart')
    // eslint-disable-next-line no-new
    const chart = new Chart(ctx, {
      type: 'line',
      data: {
        datasets: [
          {
            backgroundColor: 'rgba(229, 222, 255,0.5)',
            borderColor: '#cdc1fc',
            label: 'Memory usage (kilobytes)',
            lineTension: 0.1,
            data: []
          }
        ]
      },
      options: {
        responsive: false,
        scales: {
          xAxes: [
            {
              type: 'time',
              ticks: {
                source: 'data',
                round: 'minute',
                autoSkip: true,
                autoSkipPadding: 60
              },
              time: {
                displayFormats: {
                  millisecond: 'h:mm:ss a'
                }
              }
            }
          ]
        }
      }
    })

    updateChart({ chart })

    setInterval(() => {
      updateChart({ chart })
    }, 10000)
  }, [])

  return (
    <AnalyticsView>
      <MemoryChart id='myChart' height='300' />
    </AnalyticsView>
  )
}

export { Analytics }
