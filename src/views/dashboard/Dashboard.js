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
// import { AddBox, ArrowDownward } from "@material-ui/icons";

import {
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCol,
  CRow,
  CFormInput,
  CSpinner,
  // CTable,
} from '@coreui/react'

import moment from 'moment'
import MaterialTable from 'material-table'

import ChartOne from './Chart/ChartOne'
import ChartTwo from './Chart/ChartTwo'
import ChartThree from './Chart/ChartThree'
// import TableOne from './Table/TableOne'
import Edit from '@material-ui/icons/Edit';

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
        const dataChart = await axios.get(`
          http://10.5.46.132:5000/statistic/qoscall?rangeTime=[${defaultRange}]`)
        const data = dataChart.data.data
        //render data when loading finish
        setData(data)
      } catch (error) {
        alert('Error')
      }
    }
    fetchData()
  }, [dispatch])

  // get data to table bot
  const [dataBot, setDataBot] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await axios(`http://10.5.46.132:5000/statistic/botaudiojitter?rangeTime=[${defaultRange}]`)
      var dataT = data2.data.data
      setDataBot(dataT)
    }
    fetchData()
  }, [setDataBot])

  // get data to table top
  const [dataTop, setDataTop] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await axios(`http://10.5.46.132:5000/statistic/topaudiojitter?rangeTime=[${defaultRange}]`)
      var dataT = data2.data.data
      setDataTop(dataT)
    }
    fetchData()
  }, [setDataTop])

  const columns = [
    {
      title:'ID',
      field:'_id'
    },
    {
      title:'Jitter',
      field:'sumAudioJitter'
    },
  ]
  
  // handle when click 
  const onClickApply = async () => {
    setLoading(true)
    // data chart
    const data1 = await axios.get(`
    http://10.5.46.132:5000/statistic/qoscall?rangeTime=[${period}]`)
    const data = data1.data.data

    //data table bot
    const dataBot = await axios.get(`http://10.5.46.132:5000/statistic/botaudiojitter?rangeTime=[${period}]`)
    const dataBotTable = dataBot.data.data

    //data table top
    const dataTop = await axios.get(`http://10.5.46.132:5000/statistic/topaudiojitter?rangeTime=[${period}]`)
    const dataTopTable = dataTop.data.data

    // render data when click 
    setData(data)
    setDataBot(dataBotTable)
    setDataTop(dataTopTable)
    setLoading(false)
  }
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
          color={'#4dbd74'}
        />
        <ChartTwo
          title={'Audio Byte Sent Dataset'}
          style={{ height: '300px', marginTop: '40px' }}
          data={data.audioByteSentDataset}
          labels={data.labels}
          legend={data.legend}
          color={'#0384fc'}
        />
        <ChartThree
          title={'Audio Packet Lost Dataset'}
          style={{ height: '300px', marginTop: '40px' }}
          data={data.audioPacketLostDataset}
          labels={data.labels}
          legend={data.legend}
          color={'#fc0303'}
        />
        <CRow>
          <CCol xs={6}>
           <MaterialTable title="Five Worst Audio Jitter "
            data={dataBot}
            columns={columns}
            options={{
              search: false,
              paging: false,
              actionsColumnIndex: -1
            }}
            actions={[
              {
                icon: () => <Edit />,
                tooltip: 'View',
                onClick: () => window.location.href = 'http://localhost:3000/'
              }
            ]}
           >
           </MaterialTable>
          </CCol>
          <CCol xs={6}>
           <MaterialTable title="Five Best Audio Jitter"
            data={dataTop}
            columns={columns}
            options={{
              search: false,
              paging: false,
              actionsColumnIndex: -1
            }}
            actions={[
              {
                icon: () => <Edit />,
                tooltip: 'View',
                onClick: () => window.location.href = 'http://localhost:3000/'
              }
            ]}
           >
           </MaterialTable>
          </CCol>
        </CRow>
      </CCardBody>
    </CCard>
  )
}

export default Dashboard
