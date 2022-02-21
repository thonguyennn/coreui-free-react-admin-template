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
  CFormLabel,
  CFormInput ,
  CForm,
} from '@coreui/react'
import { useDispatch } from "react-redux";
import { useHistory } from 'react-router-dom'
import { createRole } from '../../actions'
const CreateRole = () => {
  const history = useHistory()
  const [modal, setModal] = useState(false);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const dispatch = useDispatch()

  const handleYesClick = () => {
    const values = {
      name, code,
      description,
    }
    dispatch(createRole(values))
    setModal(!modal);
    setName('')
    setCode('')
    setDescription('')
  }
  const toggle = () => {
    setModal(!modal);
  }

  return (
    <>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
              Create New Role
            </CCardHeader>
            <CCardBody>
              {
                <CForm>
                    <CFormLabel>Role Name</CFormLabel>
                    <CFormInput 
                      type="string"
                      value={name}
                      onChange={v => setName(v.target.value)
                      }
                    />
                    <CFormLabel >Role Code</CFormLabel>
                    <CFormInput 
                      type="string"
                      value={code}
                      onChange={v => setCode(v.target.value)}
                    />
                    <CFormLabel >Description</CFormLabel>
                    <CFormInput 
                      type="string"
                      value={description}
                      onChange={v => setDescription(v.target.value)}
                    />
                </CForm>
              }
            </CCardBody>
          </CCard>
          <CButtonGroup>
            <CButton
              className="m-2"
              color='danger'
              onClick={() => history.push('/roles')}
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
                  color="danger"
                  onClick={toggle}
                >
                  No
                  </CButton>
              </CModalFooter>
            </CModal>
          </CButtonGroup>
        </CCol>
      </CRow>
    </>
  )
}

export default CreateRole
