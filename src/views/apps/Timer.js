/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButton,
  CButtonGroup,
  CModal,
  CModalBody,
  CModalFooter,
  CFormLabel,
  CFormInput,
  CForm,
  CFormSelect,
  CFormFeedback ,
  CSpinner,
} from '@coreui/react'

import { useSelector, useDispatch } from "react-redux";
import { getListApp } from '../../actions'
import CanUpdate from '../../components/subComponents/CanUpdate';
import { useHistory } from 'react-router-dom';
import { postWorker } from '../../actions';

const WokerTimer = () => {
  const history = useHistory();
  const defaultValues = {
    startTime: '',
    endTime: '',
    rangeTime: 5
  }
  const selectorRangeTime = [5, 10, 15, 20, 25, 30];
  const [loading, setLoading] = useState(false)
  const [modal, setModal] = useState(false);
  const [values, setValues] = useState(defaultValues)
  const [data, setData] = useState({ count: 0, rows: [] })
  const [selectedApp, setSelectedApp] = useState(0);

  const userPermissions = useSelector(state => state.me.actions);
  const dispatch = useDispatch()
  const fetchData = async () => {
    const data = await getListApp(100, 1, '', 'id,app_name');
    setData(data);
  }
  useEffect(() => {
    fetchData()
  }, [])

  const handleYesClick = async () => {
    setModal(!modal);
    setLoading(true)
    let check = 0;
    for (let key in values) {
      if (values[key] === '') {
        check = 1;
        document.getElementById('form').classList.add('was-validated');
        break;
      }
    }
    if (!check) {
      await dispatch(postWorker(selectedApp, values));
    }
    setLoading(false)
    setValues({ ...defaultValues })
    setSelectedApp(0);
  }
  const toggle = () => {
    setModal(!modal);
  }
  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            
              <CCol md="2">
                <CFormLabel htmlFor="selectSm">Select App</CFormLabel>
              </CCol>
              <CCol xs="12" md="10">
                <CFormSelect
                  custom name="selectSm" id="SelectLm"
                  value={selectedApp}
                  onChange={(e) => setSelectedApp(e.target.value)}
                >
                  <option key="0" value="" >Please select app</option>
                  <option key="1" value="all" >All</option>
                  {data?.rows.map((item, index) => {
                    return <option key={index + 2} value={item.id}>
                      {item.app_name}
                    </option>
                  })}
                </CFormSelect>
              </CCol>
            
          </CCardHeader>
          <CCardBody>
            <CForm id='form'>
              
                <CFormLabel >Start Time</CFormLabel>
                <CFormInput
                  id='start-time'
                  type="datetime-local"
                  required
                  value={values.startTime}
                  onChange={(e) => setValues({ ...values, startTime: e.target.value })}
                />
                <CFormFeedback id="help-block-start-time" className="help-block">
                  Field is required
                </CFormFeedback>
              
              
                <CFormLabel >End Time</CFormLabel>
                <CFormInput
                  id='end-time'
                  type="datetime-local"
                  required
                  value={values.endTime}
                  onChange={(e) => setValues({ ...values, endTime: e.target.value })}
                />
                <CFormFeedback className="help-block">
                  Field is required
                </CFormFeedback>
              
              
                <CFormLabel >Range Time</CFormLabel>
                <CFormSelect
                  required id='range-time'
                  onChange={(e) => setValues({ ...values, rangeTime: e.target.value })}>
                  {selectorRangeTime.map((e, i) => (
                    i === 0 ? <option key={i} defaultValue value={e}>{e}</option>
                      : <option key={i} value={e}>{e}</option>
                  ))}
                </CFormSelect>
              
            </CForm>
          </CCardBody>
        </CCard>
        <CanUpdate permissions={userPermissions} resource={'App'}>
          <CButtonGroup>
            <CButton
              className="m-2"
              color='danger'
              onClick={() => history.push(`/`)}
            >
              Back
            </CButton>
            <CButton
              className="m-2"
              color='info'
              onClick={toggle}
            >
              Save
            </CButton>
            <CModal
              show={modal}
              onClose={toggle}
            >
              <CModalBody>
                Do you want save changes?
              </CModalBody>
              <CModalFooter>
                <CButton
                  type="submit  "
                  color="primary"
                  onClick={handleYesClick}>
                  Yes
                </CButton>{' '}
                <CButton
                  color="secondary"
                  onClick={toggle}
                >
                  No
                </CButton>
              </CModalFooter>
            </CModal>
          </CButtonGroup>
        </CanUpdate>
        <CModal
          show={loading}
          closeOnBackdrop={false}
        >
          <CModalBody>
            Generating...Please dont close browser.
          </CModalBody>
          <CModalFooter style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}>
            <CSpinner
              style={{
                width: '4rem', height: '4rem',
              }}
              color="primary"
              variant="grow"
            />
          </CModalFooter>
        </CModal>
      </CCol>
    </CRow>
  )
}

export default WokerTimer
