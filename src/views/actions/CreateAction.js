/* eslint-disable prettier/prettier */
import React, { useState } from 'react'
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
  CFormLabel ,
  CFormInput,
  CForm,
  CFormCheck,
  CToaster,
  // CToastBody
} from '@coreui/react'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createAction } from '../../actions'
const CreateAction = () => {
  const history = useHistory()
  const [modal, setModal] = useState(false);
  // const [toasts, setToasts] = useState([])


  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [isDefault, setIsDefault] = useState(false);
  const dispatch = useDispatch()

  const handleYesClick = () => {
    const values = {
      name, code,
      description, isDefault,
    }
    dispatch(createAction(values))
    setModal(!modal);
    setName('')
    setCode('')
    setDescription('')
    setIsDefault('')
  }
  const toggle = () => {
    setModal(!modal);
  }

  // const addToast = () => {
  //   setToasts([
  //     ...toasts,
  //   ])
  // }
  return (
    <>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              Create New Action
            </CCardHeader>
            <CCardBody>
              {
                <CForm>
                    <CFormLabel >Action Name</CFormLabel >
                    <CFormInput
                      type="string"
                      value={name}
                      onChange={v => setName(v.target.value)
                      }
                    />
                    <CFormLabel  >Action Code</CFormLabel >
                    <CFormInput
                      type="string"
                      value={code}
                      onChange={v => setCode(v.target.value)}
                    />
                    <CFormLabel  >Description</CFormLabel >
                    <CFormInput
                      type="string"
                      value={description}
                      onChange={v => setDescription(v.target.value)}
                    />
                    <span><CFormLabel >Default</CFormLabel >
                      <CFormCheck
                        style={{ transform: 'scale(1.5)' }}
                        type="checkbox"
                        className="ml-3"
                        checked={isDefault}
                        onChange={() => setIsDefault(!isDefault)}
                      /></span>
                </CForm>
              }
            </CCardBody>
          </CCard>
          <CButtonGroup>
            <CButton
              className="m-2"
              color='danger'
              onClick={() => history.push('/actions')}
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
                Do you want create new action?
                </CModalBody>
              <CModalFooter>
                <CButton
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
        </CCol>
        <CCol sm="12" lg="6">
          <CToaster
            position={'top-right'}
            key={'toaster'}
          >
            {/* {toasts.map(({ status }, index) => {
              const { color, message } = toasters(status);
              return message ? (
                <CToast
                  key={'toast' + index}
                  show={true}
                  autohide={3000}
                  fade={true}
                >
                  <CToastHeader closeButton={true} style={{ color }}>
                    {message}
                  </CToastHeader>
                </CToast>
              ) : null
            })} */}
          </CToaster>
        </CCol>
      </CRow>
    </>
  )
}

export default CreateAction
