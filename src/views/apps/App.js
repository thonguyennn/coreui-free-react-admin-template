/* eslint-disable react/prop-types */
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
  CFormCheck,
  CFormSelect
} from '@coreui/react'
import { useHistory } from 'react-router-dom'

import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from "react-redux";
import { getAppById, updateAppById, addToast } from '../../actions'
import CanUpdate from '../../components/subComponents/CanUpdate';

const App = ({ match }) => {
  const channel_name = ['', 'log_vtv', 'live_view', 'log_vccorp', 'log_view_new', 'log_view']
  const channel_error = ['', 'soha_log_error'];
  const history = useHistory()
  const [editing, setEditing] = useState(false)
  const [modal, setModal] = useState(false);
  const [details, setDetails] = useState({})
  const [old, setOld] = useState({})
  const userPermissions = useSelector(state => state.me.actions);

  const [showPwd, setShowPwd] = useState('password')
  const [showLiveTime, setShowLiveTime] = useState(false);

  const dispatch = useDispatch()
  useEffect(() => {
    async function fetchData() {
      try {
        let details = await getAppById(match.params.id);
        setDetails(details)
        setOld(details)
        setShowLiveTime(!!details.isLive)
      } catch (error) {
        const res = error.response;
        const status = res.status;
        const { message } = res.data;
        return dispatch(addToast({ status, message }))
      }
    }
    fetchData()
  }, [dispatch, match.params.id])

  const handleEditClick = () => {
    setEditing(true)
  }

  const handleBackClick = () => {
    setEditing(false)
    setDetails({ details, ...old })
  }
  const handleYesClick = () => {
    dispatch(updateAppById(match.params.id, details))

    setModal(!modal);
    setEditing(false);
    if (!details.isLive) {
      setDetails({ ...details, liveTimeEnd: null, liveTimeStart: null })
    }
  }
  const toggle = () => {
    setModal(!modal);
  }
  const convertDatetimeValue = (datetime) => {
    if (!datetime) return null;
    let newDatetime = + new Date(datetime) + (7 * 60 * 60 * 1000);
    return new Date(newDatetime)?.toJSON().substring(0, 16);

  }
  return (
    <>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              App: {details.app_name || 'UNKNOW'}
            </CCardHeader>
            <CCardBody>
              {Object.getOwnPropertyNames(details).length > 0 ? (
                <CForm>
                    <CFormLabel>App Name</CFormLabel>
                    <CFormInput
                      type="string"
                      disabled={!editing}
                      value={details.app_name}
                      onChange={v => setDetails({ ...details, appName: v.target.value })}
                    />
                  
                    <CFormLabel >App ID</CFormLabel>
                    <CFormInput
                      type="string"
                      disabled
                      value={details.app_id}
                    />
                    <CFormLabel >Log ID</CFormLabel>
                    <CFormInput
                      disabled
                      type="string"
                      value={details.log_id}
                    />
                    <CFormLabel >Note</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type="string"
                      value={details.note}
                      onChange={v => setDetails({ ...details, note: v.target.value })}
                    />
                    <CFormLabel >Core Running</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type="string"
                      value={details.core}
                      onChange={v => setDetails({ ...details, core: v.target.value })}
                    />
                    <span>
                      <CFormLabel>Report Auto</CFormLabel>
                      <CFormCheck
                        style={{ transform: 'scale(1.5)' }}
                        disabled={!editing}
                        type="checkbox"
                        className="ml-3"
                        checked={details.report_auto}
                        onChange={(v) => setDetails({ ...details, report_auto: Number(v.target.checked) })}
                      />
                    </span>
                    <CFormLabel >Key Log</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type="string"
                      value={details.key_log || ''}
                      onChange={v => setDetails({ ...details, key_log: v.target.value })}
                    />
                    <CFormLabel >Key Log Error</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type="string"
                      value={details.key_log_error || ''}
                      onChange={v => setDetails({ ...details, key_log_error: v.target.value })}

                    />
                    <CFormLabel>Elastic Search Host</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type="string"
                      value={details.elastic_host ?? ''}
                      onChange={v => setDetails({ ...details, elastic_host: v.target.value })}
                    />

                  
                  
                    <CFormLabel>Key Elastic Search</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type="string"
                      value={details.key_elastic || ''}
                      onChange={v => setDetails({ ...details, key_elastic: v.target.value })}
                    />
                  
                  
                    <CFormLabel>Key Elastic Search Error</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type="string"
                      value={details.key_elastic_error || ''}
                      onChange={v => setDetails({ ...details, key_elastic_error: v.target.value })}
                    />
                  
                  
                    <CFormLabel>Name Server</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type="string"
                      value={details.name_server || ''}
                      onChange={v => setDetails({ ...details, name_server: v.target.value })}
                    />
                  
                  
                    <CFormLabel>Name Server Error</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type="string"
                      value={details.name_server_error || ''}
                      onChange={v => setDetails({ ...details, name_server_error: v.target.value })}
                    />
                  
                  
                    <CFormLabel>RabbitMQ Channel Name</CFormLabel>
                    <CFormSelect id='channel-name'
                      disabled={!editing}
                      onChange={v => setDetails({ ...details, channel_name: v.target.value })}>
                      {channel_name.map((e, i) => {
                        if (e === details.channel_name || !details.channel_name) {
                          return (<option key={i} selected value={e}>{e}</option>)
                        }
                        return (<option key={i} value={e}>{e}</option>)
                      }
                      )}
                    </CFormSelect>
                  
                  
                    <CFormLabel>RabbitMQ Channel Name Error</CFormLabel>
                    <CFormSelect id='channel-error'
                      disabled={!editing}
                      onChange={v => setDetails({ ...details, channel_name_error: v.target.value })}>
                      {channel_error.map((e, i) => {
                        if (e === details.channel_name_error) {
                          return <option key={i} selected value={e}>{e}</option>
                        }
                        return <option key={i} value={e}>{e}</option>
                      }
                      )}
                    </CFormSelect>
                  
                  
                    <CFormLabel>Redis Host</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type="string"
                      value={details.redis_host || ''}
                      onChange={v => setDetails({ ...details, redis_host: v.target.value })}
                    />
                  
                  
                    <CFormLabel>Redis Password</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type={showPwd}
                      // type={'string'}
                      value={details.redis_password || ''}
                      onChange={v => setDetails({ ...details, redis_password: v.target.value })}
                    />
                    <span>
                      <CFormLabel>Show Password</CFormLabel>
                      <CFormCheck
                        style={{ transform: 'scale(1.2)' }}
                        disabled={!editing}
                        type="checkbox"
                        className="ml-3"
                        onChange={(v) => !!v.target.checked ? setShowPwd('string') : setShowPwd('password')}
                      />

                    </span>
                  
                  
                    <CFormLabel>Redis DB</CFormLabel>
                    <CFormInput
                      disabled={!editing}
                      type="number"
                      value={details.redis_db || 0}
                      onChange={v => setDetails({ ...details, redis_db: v.target.value })}
                    />
                  
                  
                    <span>
                      <CFormLabel>Live</CFormLabel>
                      <CFormCheck
                        style={{ transform: 'scale(1.5)' }}
                        disabled={!editing}
                        type="checkbox"
                        className="ml-3"
                        checked={details.isLive}
                        onChange={(v) => {
                          setDetails({ ...details, isLive: Number(v.target.checked) })
                          setShowLiveTime(v.target.checked)
                        }}
                      />
                    </span>
                  
                  {showLiveTime && <>
                    
                      <CFormLabel>Live Time Start</CFormLabel>
                      <CFormInput
                        disabled={!editing}
                        type="datetime-local"
                        value={convertDatetimeValue(details.liveTimeStart)}
                        onChange={v => setDetails({ ...details, liveTimeStart: v.target.value })}
                      />
                    
                    
                      <CFormLabel>Live Time End</CFormLabel>
                      <CFormInput
                        disabled={!editing}
                        type="datetime-local"
                        value={convertDatetimeValue(details.liveTimeEnd)}
                        onChange={v => setDetails({ ...details, liveTimeEnd: v.target.value })}
                      />
                    
                  </>}
                </CForm>)
                :
                (<span><CIcon className="text-muted" /> Not found</span>)
              }
            </CCardBody>
          </CCard>
          <CanUpdate permissions={userPermissions} resource={'App'}>
            {editing ?
              (
                <CButtonGroup>
                  <CButton
                    className="m-2"
                    color='danger'
                    onClick={handleBackClick}
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
                        color="primary"
                        onClick={handleYesClick}>
                        Yes
                      </CButton>{' '}
                      <CButton
                        color="danger"
                        onClick={toggle}
                      >
                        No
                      </CButton>
                    </CModalFooter>
                  </CModal>
                </CButtonGroup>
              )
              :
              <CButtonGroup>
                <CButton
                  className="m-2"
                  color='danger'
                  onClick={handleEditClick}
                >
                  Edit
                </CButton>
                <CButton
                  className="m-2"
                  color='info'
                  onClick={() => history.push(`/apps/list/${match.params.id}/workers`)}
                >
                  List Worker
                </CButton>
              </CButtonGroup>
            }
          </CanUpdate>
        </CCol>
      </CRow>
    </>
  )
}

export default App
