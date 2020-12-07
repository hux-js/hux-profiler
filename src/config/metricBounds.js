const metricBounds = {
  responseTimes: {
    query: [0, 5, 10],
    api: [0, 500, 1000]
  }
}

// TODO: Weight is too provincial
export const getMetricRating = ({ time, type, size }) => {
  const bounds = metricBounds.responseTimes[type]
  const weight = time / size

  if (weight <= bounds[1]) {
    return 'High'
  }

  if (weight <= bounds[2]) {
    return 'Medium'
  }

  return 'Low'
}
