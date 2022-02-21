/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CInputGroup,
  CForm,
  CFormLabel,
  CFormInput,
  CImage,
  CFormSelect,
  CButtonGroup,
  CButton,
  CModalFooter,
  CModalBody,
  CModal
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from "react-redux";
import { getUserById, getListRole, updateUserById } from '../../actions'
import CanUpdate from '../../components/subComponents/CanUpdate'

const User = ({ match }) => {
  const [editing, setEditing] = useState(false);
  const [roleId, setRoleId] = useState(null);
  const { details } = useSelector(state => state.user)
  const { list: listRole } = useSelector(state => state.role)
  const [modal, setModal] = useState(false);
  const userPermissions = useSelector(state => state.me.actions);
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getUserById(match.params.id))
    dispatch(getListRole(100, 1))
  }, [dispatch, match.params.id])
  const handleEditClick = () => {
    setEditing(true)
  }
  const handleBackClick = () => {
    setEditing(false)
  }
  const handleYesClick = async () => {
    await dispatch(updateUserById(match.params.id, { roleId }))
    dispatch(getUserById(match.params.id))
    setModal(!modal);
    setEditing(false);
  }
  const toggle = () => {
    setModal(!modal);
  }
  return (
    <CRow>
      <CCol lg={12}>
        <CCard>
          <CCardHeader>
            User id: {match.params.id}
          </CCardHeader>
          <CCardBody>
            {Object.getOwnPropertyNames(details).length > 0 ? (
              <CForm>
                  <CImage src={details.avatar} alt={`avatar-${details.value}`} height="100" />
                <CInputGroup>
                  <CFormLabel>Full Name</CFormLabel>
                  <CFormInput
                    type="string"
                    disabled
                    value={details.fullName}
                  />
                </CInputGroup>
                <CInputGroup>
                  <CFormLabel>Usermame</CFormLabel>
                  <CFormInput
                    type="string"
                    disabled
                    value={details.name}
                  />
                </CInputGroup>
                <CInputGroup>
                  <CFormLabel >Email</CFormLabel>
                  <CFormInput
                    type="string"
                    disabled
                    value={details.email}
                  />
                </CInputGroup>
                <CInputGroup>
                  <CFormLabel >Mobile</CFormLabel>
                  <CFormInput
                    type="string"
                    disabled
                    value={details.mobile || ''}
                  />
                </CInputGroup>
                <CInputGroup>
                  <CFormLabel >VietID</CFormLabel>
                  <CFormInput
                    disabled
                    type="string"
                    value={details.vietid}
                  />
                </CInputGroup>
                <CInputGroup>
                  <CFormLabel >Birthday</CFormLabel>
                  <CFormInput
                    disabled
                    type="string"
                    value={details.birthday || ''}
                  />
                </CInputGroup>
                <CInputGroup>
                  <CFormLabel >Role</CFormLabel>
                  <CFormSelect disabled={!editing} onChange={(e) => setRoleId(e.target.value)}>
                    {listRole.rows && listRole.rows.length && listRole.rows.map((role, index) => {
                      if (details.roleId === role.id) {
                        return (<option key={index} defaultValue value={role.id}>{role.name}</option>)
                      }
                      return (<option key={index} value={role.id}>{role.name}</option>)
                    })}
                  </CFormSelect>
                </CInputGroup>
              </CForm>)
              :
              (<span><CIcon className="text-muted" /> Not found</span>)
            }
            <CanUpdate permissions={userPermissions} resource={'Action'}>
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
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default User
