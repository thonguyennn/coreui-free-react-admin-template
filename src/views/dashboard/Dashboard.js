import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { useDispatch } from 'react-redux'

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormInput,
  // CTable,
  // CTableBody,
  // CTableDataCell,
  // CTableHead,
  // CTableHeaderCell,
  // CTableRow,
} from '@coreui/react'
import moment from 'moment'
import ChartOne from './Chart/ChartOne'
import ChartTwo from './Chart/ChartTwo'
import ChartThree from './Chart/ChartThree'

const Dashboard = () => {
  const dispatch = useDispatch()
  // const [loading, setLoading] = useState(true)
  const [data, setData] = useState({
    legend: '',
    totalCalls: 0,
    totalUsers: 0,
    androidCalls: 0,
    iOSCalls: 0,
    errorCall: 0,
    labels: [],
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

  const [period, setPeriod] = useState([])

  useEffect(() => {
    // setLoading(true)
    const fetchData = async () => {
      try {
        var time = new Date(moment().format('YYYY-MM-DD'))
        const defaultRange = [+time, +time]
        const data1 = await axios.get(`
          http://10.5.46.132:5000/statistic/qoscall?rangeTime=[${defaultRange}]`)
        const data = data1.data.data
        setData(data)
        console.log(data)
        console.log(data1)
      } catch (error) {
        console.log(error)
        alert('Error')
      }
    }

    fetchData()
  }, [dispatch])

  const onClickApply = async () => {
    // setLoading(true)
    const data1 = await axios.get(`
    http://10.5.46.132:5000/statistic/qoscall?rangeTime=[${period}]`)
    const data = data1.data.data
    setData(data)
    console.log(period)
    // setLoading(false)
  }

  return (
    <CCard>
      <CCardBody>
        <CRow>
          <CCol sm="6">
            <h1>Video Call Analytics</h1>
          </CCol>
          <CCol className="d-none d-md-block col-sm-2">
            <h5>Start Date</h5>
            <CFormInput
              type="date"
              value={moment(period[0]).format('YYYY-MM-DD')}
              onChange={(e) => setPeriod([+moment(e.target.value), period[1]])}
            />
          </CCol>
          <CCol className="d-none d-md-block col-sm-2">
            <h5>End Date</h5>
            <CFormInput
              type="date"
              value={moment(period[1]).format('YYYY-MM-DD')}
              onChange={(e) => setPeriod([period[0], +moment(e.target.value)])}
            />
          </CCol>
          <CCol className="d-none d-md-block col-sm-2">
            <CButtonGroup>
              <CButton className="m-4" color="info" onClick={() => onClickApply()}>
                Submit
              </CButton>
            </CButtonGroup>
          </CCol>
        </CRow>
        <CRow>
          <CCol xs={12} md={6} xl={12}>
            <CRow>
              <CCol sm={2}>
                <div className="border-start border-start-4 border-start-info py-1 px-3">
                  <div className="text-medium-emphasis small">Total Calls</div>
                  <div className="fs-5 fw-semibold">{data.totalCall}</div>
                </div>
              </CCol>
              <CCol sm={2}>
                <div className="border-start border-start-4 border-start-info py-1 px-3 mb-3">
                  <div className="text-medium-emphasis small">Total Users</div>
                  <div className="fs-5 fw-semibold">{data.totalUser}</div>
                </div>
              </CCol>
              <CCol sm={2}>
                <div className="border-start border-start-4 border-start-success py-1 px-3 mb-3">
                  <div className="text-medium-emphasis small">Android Calls</div>
                  <div className="fs-5 fw-semibold">{data.androidCalls}</div>
                </div>
              </CCol>
              <CCol sm={2}>
                <div className="border-start border-start-4 border-start-secondary py-1 px-3 mb-3">
                  <div className="text-medium-emphasis small">IOS Calls</div>
                  <div className="fs-5 fw-semibold">{data.iOSCalls}</div>
                </div>
              </CCol>
              <CCol sm={2}>
                <div className="border-start border-start-4 border-start-danger py-1 px-3 mb-3">
                  <div className="text-medium-emphasis small">Error Calls</div>
                  <div className="fs-5 fw-semibold">{data.errorCall}</div>
                </div>
              </CCol>
            </CRow>
          </CCol>
        </CRow>
        <ChartOne
          title={'Audio Bit Rate Dataset'}
          style={{ height: '300px', marginTop: '40px' }}
          data={data.audioBitrateDataset}
          labels={data.labels}
          legend={data.legend}
        />
        <ChartTwo
          title={'Audio Byte Sent Dataset'}
          style={{ height: '300px', marginTop: '40px' }}
          data={data.audioByteSentDataset}
          labels={data.labels}
          legend={data.legend}
        />
        <ChartThree
          title={'Audio Packet Lost Dataset'}
          style={{ height: '300px', marginTop: '40px' }}
          data={data.audioPacketLostDataset}
          labels={data.labels}
          legend={data.legend}
        />
      </CCardBody>
    </CCard>
  )
}

export default Dashboard
