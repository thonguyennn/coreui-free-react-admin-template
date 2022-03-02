/* eslint-disable array-callback-return */
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
import { useHistory } from 'react-router-dom';

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
import ChartPie  from './ChartPie/ChartPie';
import Edit from '@material-ui/icons/Edit';
// import ChartDataLabels from 'chartjs-plugin-datalabels';


const Dashboard = () => {
  const history = useHistory();
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
        const dataChart = await axios.get(`${process.env.REACT_APP_API_HOST}/statistic/qoscall?rangeTime=[${defaultRange}]`)
        const data = dataChart.data.data
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
      const data2 = await axios(`${process.env.REACT_APP_API_HOST}/statistic/botaudiojitter?rangeTime=[${defaultRange}]`)
      var dataT = data2.data.data
      setDataBot(dataT)
    }
    fetchData()
  }, [setDataBot])

  // get data to table top
  const [dataTop, setDataTop] = useState([])
  useEffect(() => {
    const fetchData = async () => {
      const data2 = await axios(`${process.env.REACT_APP_API_HOST}/statistic/topaudiojitter?rangeTime=[${defaultRange}]`)
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
    const dataChart = await axios.get(`${process.env.REACT_APP_API_HOST}/statistic/qoscall?rangeTime=[${period}]`)
    const data = dataChart.data.data

    //data table bot
    const dataBot = await axios.get(`${process.env.REACT_APP_API_HOST}/statistic/botaudiojitter?rangeTime=[${period}]`)
    const dataBotTable = dataBot.data.data

    //data table top
    const dataTop = await axios.get(`${process.env.REACT_APP_API_HOST}/statistic/topaudiojitter?rangeTime=[${period}]`)
    const dataTopTable = dataTop.data.data

    // render data when click 
    setData(data)
    setDataBot(dataBotTable)
    setDataTop(dataTopTable)
    setLoading(false)
  }
  // const options = {
  //   tooltip: {
  //     enabled: false
  //   },
  //   plugins: {
  //     datalabels: {
  //       display: function(context) {
  //         var dataset = context.dataset;
  //         var count = dataset.data.length;
  //         var value = dataset.data[context.dataIndex];
  //         console.log(context)
  //         return value > count * 1.5;
  //       },
  //     }
  //   },
  // };
  // handle click table data
  const handleClick = (e, rowData) => {
    console.log(rowData._id)
    history.push(`/viewCall/${rowData._id}`)
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
        <CRow>
          <h3 className='mt-5'>Total Call</h3>
          <CCol xs={12}>
            <ChartOne
              title={'Total Call'}
              style={{ height: '300px', marginTop: '40px' }}
              data={data.callDataset}
              labels={data.labels}
              legend={data.legend}
              color={'#4dbd74'}
            />
          </CCol>
          <h3 className='mt-5'>Total User Call</h3>
          <CCol xs={12}>
            <ChartTwo
              title={'Total User Call'}
              style={{ height: '300px', marginTop: '40px' }}
              data={data.userDataset}
              labels={data.labels}
              legend={data.legend}
              color={'#0384fc'}
            />
          </CCol>
          <h3 className='mt-5'>Audio Packet Lost Dataset</h3>
          <CCol xs={12}>
            <ChartThree
              title={'Audio Packet Lost Dataset'}
              style={{ height: '300px', marginTop: '40px' }}
              data={data.audioPacketLostDataset}
              labels={data.labels}
              legend={data.legend}
              color={'#fc0303'}
            />
          </CCol>
        </CRow>
        <CRow className="mt-4 align-self-center">
          <CCol xs={12} className="align-self-center">
            <h3 className='mt-5 mb-5'>Carriers and Error Chart</h3>
          </CCol>
          <CCol xs={6}>
            <ChartPie
            data={data.carriers.map((dataC) => dataC.count)}
            labels={data.carriers.map((dataL) => dataL.carrier)}
            title="Carriers Chart"
            // options={options}
          />
          </CCol>
          <CCol xs={6}>
            <ChartPie
            data={data.errors.map((dataC) => dataC.count)}
            labels={data.errors.map((dataL) => dataL.error)}
            title="Error Chart"
            // options={options}
            />
          </CCol>
        </CRow>
        <CRow className='mt-5 mb-5'>
          <CCol xs={6}>
           <MaterialTable title="Five Worst Audio Jitter "
            data={dataBot}
            columns={columns}
            options={{
              search: false,
              paging: false,
              actionsColumnIndex: -1,
              sorting: false,
              headerStyle:{background: "#c5c9d1"},
            }}
            actions={[
              {
                icon: () => <Edit />,
                tooltip: 'View',
                onClick: (e, rowData) => handleClick(e, rowData)
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
              actionsColumnIndex: -1,
              sorting: false,
              headerStyle:{background: "#c5c9d1"},
            }}
            actions={[
              {
                icon: () => <Edit />,
                tooltip: 'View',
                onClick: (e, rowData) => handleClick(e, rowData)
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
