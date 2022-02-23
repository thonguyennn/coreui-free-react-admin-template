/* eslint-disable prettier/prettier */
import React from 'react'
import { CChartLine } from '@coreui/react-chartjs'


const xLegend = {
  s: 'Seconds',
  m: 'Minutes',
  h: 'Hours',
  d: 'Days',
}
// eslint-disable-next-line react/prop-types
const ChartTwo = ({ style, title, labels, legend, data, color}) => {
  const datasets = (() => {
    return [
      {
        label: title,
        backgroundColor: 'transparent',
        borderColor: color,
        pointHoverBackgroundColor: color,
        borderWidth: 2,
        data: data,
      },
    ]
  })()

  const options = (() => {
    return {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
        },
        tooltip: {
          callbacks: {
            label: function (context) {
              let label = context.dataset.label || ''
              if (label) {
                label += ': '
              }
              if (context.parsed.y !== null) {
                label += context.parsed.y + 'Byte'
              }
              return label
            },
          },
        },
      },
      scales: {
        x: {
          display: true,
          title: {
            display: true,
            text: xLegend[legend] || 'Hours',
          },
          grid: {
            drawOnChartArea: false,
          },
          beginAtZero: true,
        },
        y: {
          display: true,
          title: {
            display: true,
            text: 'Byte',
          },
          beginAtZero: true,
        },
      },
      elements: {
        line: {
          tension: 0.4,
        },
        point: {
          radius: 0,
          hitRadius: 10,
          hoverRadius: 4,
          hoverBorderWidth: 3,
        },
      },
    }
  })()
  return (
    <CChartLine
      style={style}
      color={color}
      data={{
        labels: labels,
        datasets,
      }}
      options={options}
    />
  )
}


export default ChartTwo
