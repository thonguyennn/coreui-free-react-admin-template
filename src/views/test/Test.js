/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CFormLabel,
} from '@coreui/react'

const Test = () => {
  const [args, setArgs] = useState({
    iterate: 0,
    start: 0,
    end: 0,
    log_id: '',
    id_vid: '',
  });
  const [isExcute, setExcute] = useState(false)
  const [myUrl, setMyUrl] = useState('')
  const [myArr, setMyArr] = useState([])
  const handleClick = () => {
    const url = `https://undersea-api.vietid.net/getviewbyvid?period=[${args.start},${args.end}]&log_id=${args.log_id}&method=videolog&id_vid=${args.id_vid}`
    setMyUrl(url)
    setExcute(true)
    setMyArr(new Array(Number(args.iterate)).fill(3))
  }
  return (<>
    <CForm>
        <CFormLabel >Iterate</CFormLabel >
        <CFormInput
          value={args.iterate}
          onChange={e => {
            setArgs({ ...args, iterate: e.target.value });
            setExcute(false)
          }}
        >
        </CFormInput>
        <CFormLabel >Start</CFormLabel >
        <CFormInput value={args.start} onChange={e => {
          setArgs({ ...args, start: e.target.value });
          setExcute(false)
        }}></CFormInput>
        <CFormLabel >End</CFormLabel >
        <CFormInput value={args.end} onChange={e => {
          setArgs({ ...args, end: e.target.value });
          setExcute(false)
        }}></CFormInput>
        <CFormLabel >Log ID</CFormLabel >
        <CFormInput value={args.log_id} onChange={e => {
          setArgs({ ...args, log_id: e.target.value });
          setExcute(false)
        }}></CFormInput>
        <CFormLabel >ID Vid</CFormLabel >
        <CFormInput value={args.id_vid} onChange={e => {
          setArgs({ ...args, id_vid: e.target.value });
          setExcute(false)
        }}></CFormInput>
        <CButton onClick={_ => handleClick()} color="info">Execute</CButton>
    </CForm>
    {
      isExcute && myArr.map((e, index) => {
        return <iframe key={index + args.iterate} src={myUrl} title="Test"></iframe>
      })
    }
  </>)
}
export default Test
