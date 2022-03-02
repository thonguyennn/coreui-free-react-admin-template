/* eslint-disable no-labels */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-labels */
/* eslint-disable no-label-var */
/* eslint-disable react/display-name */
/* eslint-disable no-restricted-globals */
/* eslint-disable react/jsx-no-duplicate-props */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { forwardRef } from 'react';
import axios from 'axios'
import { useDispatch } from 'react-redux'

import {
  // CButton,
  // CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
  // CFormInput,
  CSpinner,
  // CTable,
} from '@coreui/react'
import moment from 'moment'
// import MaterialTable from 'material-table' 


import ChartThree from './Chart/Chart'
import Edit from '@material-ui/icons/Edit'

const Dashboard = () => {
  Edit: forwardRef((props, ref) => <Edit {...props} ref={ref} />)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true)

  // get date
  const [period, setPeriod] = useState([])
  var time = moment(moment().format('YYYY-MM-DD'))
  const defaultRange = [+time, +time]

  // get data to chart 
  const [data, setData] = useState({
    legend: '',
    totalCalls: 0,
    totalUsers: 0,
    androidCalls: 0,
    iOSCalls: 0,
    errorCall: 0,
    labels: [],
    carriers: [],
    errors: [],
    callDataset: [], 
    userDataset: [], 
    rateCall: [],
    videoFpsDataset: [],
    videoBitrateDataset: [],
    audioBitrateDataset: [],
    audioByteSentDataset: [],
    videoByteSentDataset: [],
    audioPacketLostDataset: [],
    videoPacketLostDataset: [],
    bandwidthDataset: [],
    networkDelayDataset: [],
    audioJitterDataset: [],
    videoJitterDataset: [],
  })
  useEffect(() => {
    setPeriod(defaultRange)
    setLoading(true)
    const fetchData = async () => {
      try {
        // data chart
        const dataChart = await axios.get(`${process.env.REACT_APP_API_HOST}/statistic/qoscall/1235`)
        const data = dataChart.data.data
        setData(data)
      } catch (error) {
        alert('Error')
      }
    }
    fetchData()
  }, [dispatch])

  if (loading) {
    <CSpinner
      style={{
        width: '2rem', height: '2rem',
      }}
      color="primary"
      variant="grow"
    />
  }
  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="6">
            <h1>Detail Video Call</h1>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12}>
            <ChartThree
              title={'Audio Bit Rate Dataset'}
              style={{ height: '300px', marginTop: '40px' }}
              data={data.audioBitrateDataset}
              labels={data.labels}
              legend={data.legend}
              color={'#fc0303'}
            />
          </CCol>
          <CCol xs={12}>
            <ChartThree
              title={'Audio Byte Sent Dataset'}
              style={{ height: '300px', marginTop: '40px' }}
              data={data.audioByteSentDataset}
              labels={data.labels}
              legend={data.legend}
              color={'#4dc9f6'}
            />
          </CCol>
          <CCol xs={12}>
            <ChartThree
              title={'Audio Packet Lost Dataset'}
              style={{ height: '300px', marginTop: '40px' }}
              data={data.audioPacketLostDataset}
              labels={data.labels}
              legend={data.legend}
              color={'#8549ba'}
            />
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Dashboard
