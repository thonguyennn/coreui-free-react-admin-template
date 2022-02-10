import React, { lazy } from 'react'

import {
  // CAvatar,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  // CCardHeader,
  CCol,
  // CProgress,
  CRow,
  // CTable,
  // CTableBody,
  // CTableDataCell,
  // CTableHead,
  // CTableHeaderCell,
  // CTableRow,
} from '@coreui/react'
import { CChartLine } from '@coreui/react-chartjs'
import { getStyle } from '@coreui/utils'

const Dashboard = () => {
  const random = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
  }
  const DATA_COUNT = 7
  const NUMBER_CFG = {count: DATA_COUNT, min: -100, max: 100}
  const labels = Utils.months({count: 7}) 

  return (
    <>
      <CCard className="mb-4">
        <CCardBody>
          <CRow>
            <CCol className="d-none d-md-block">
              <CButtonGroup className="float-end me-3">
                {['Day', 'Month', 'Year'].map((value) => (
                  <CButton
                    color="outline-secondary"
                    key={value}
                    className="mx-0"
                    active={value === 'Month'}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          <CChartLine
            style={{ height: '400px', marginTop: '40px' }}
            data={{
              labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
              datasets: [
                {
                  label: 'My Second dataset',
                  backgroundColor: 'transparent',
                  borderColor: getStyle('--cui-success'),
                  pointHoverBackgroundColor: getStyle('--cui-success'),
                  borderWidth: 2,
                  data: [
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                    random(50, 200),
                  ],
                },
              ],
            }}
            options={{
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  display: false,
                },
              },
              scales: {
                x: {
                  grid: {
                    drawOnChartArea: false,
                  },
                },
                y: {
                  ticks: {
                    beginAtZero: true,
                    maxTicksLimit: 5,
                    stepSize: Math.ceil(250 / 5),
                    max: 250,
                  },
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
            }}
          />
          <CChartLine
            style={{ height: '400px', marginTop: '40px' }}
            data={{
              labels: labels,
              datasets: [
                {
                  label: 'Dataset 1',
                  data: Utils.numbers(NUMBER_CFG),
                  borderColor: Utils.CHART_COLORS.red,
                  backgroundColor: Utils.transparentize(Utils.CHART_COLORS.red, 0.5),
                  yAxisID: 'y',
                },
                {
                  label: 'Dataset 2',
                  data: Utils.numbers(NUMBER_CFG),
                  borderColor: Utils.CHART_COLORS.blue,
                  backgroundColor: Utils.transparentize(Utils.CHART_COLORS.blue, 0.5),
                  yAxisID: 'y1',
                },
              ],
            }}
            options={{
              type: 'line',
              data: data,
              options: {
                responsive: true,
                interaction: {
                  mode: 'index',
                  intersect: false,
                },
                stacked: false,
                plugins: {
                  title: {
                    display: true,
                    text: 'Chart.js Line Chart - Multi Axis',
                  },
                },
                scales: {
                  y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                  },
                  y1: {
                    type: 'linear',
                    display: true,
                    position: 'right',

                    // grid line settings
                    grid: {
                      drawOnChartArea: false, // only want the grid lines for one axis to show up
                    },
                  },
                },
              },
            }}
          />
        </CCardBody>
      </CCard>
    </>
  )
}

export default Dashboard
