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
  CFormInput ,
  CForm,
} from '@coreui/react'

import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from "react-redux";
import { getRoleById, updateRoleById } from '../../actions'
import CanUpdate from '../../components/subComponents/CanUpdate';
import convertTime from '../../utils/convertTime'

const Role = ({ match }) => {
  const [editing, setEditing] = useState(false)
  const [modal, setModal] = useState(false);

  const { details } = useSelector(state => state.role)
  const userPermissions = useSelector(state => state.me.actions);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDesc] = useState('');
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getRoleById(match.params.id))
  }, [dispatch, match.params.id])

  const handleEditClick = () => {
    setEditing(true)
  }
  const handleBackClick = () => {

    setEditing(false)
  }
  const handleYesClick = () => {
    const values = {
      name, code, description
    }
    dispatch(updateRoleById(match.params.id, values))
    setModal(!modal);
    setEditing(false);
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
              Role: {details.name || 'UNKNOW'}
            </CCardHeader>
            <CCardBody>
              {
                Object.getOwnPropertyNames(details).length > 0 ? (
                  <CForm>
                      <CFormLabel>Name</CFormLabel>
                      <CFormInput
                        type="string"
                        disabled={!editing}
                        value={details.name}
                        onChange={v => setName(v.target.value)
                        }
                      />
                      <CFormLabel >Code</CFormLabel>
                      <CFormInput
                        type="string"
                        disabled={!editing}
                        value={details.code}
                        onChange={v => setCode(v.target.value)}
                      />
                      <CFormLabel >Description</CFormLabel>
                      <CFormInput
                        disabled={!editing}
                        type="string"
                        value={details.description}
                        onChange={v => setDesc(v.target.value)}
                      />
                      <CFormLabel >Create At</CFormLabel>
                      <CFormInput
                        disabled={true}
                        type="string"
                        value={convertTime(details.createdAt)}
                      />
                      <CFormLabel >Update At</CFormLabel>
                      <CFormInput
                        disabled={true}
                        type="string"
                        value={convertTime(details.updatedAt)}
                      />
                  </CForm>)
                  :
                  (<span><CIcon className="text-muted"  /> Not found</span>)
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
              <CButton
                className="m-2"
                color='danger'
                onClick={handleEditClick}
              >
                Edit
            </CButton>}
          </CanUpdate>
        </CCol>
      </CRow>
    </>
  )
}

export default Role
