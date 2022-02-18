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
  CFormLabel ,
  CFormInput,
  CForm,
  CFormCheck,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { useSelector, useDispatch } from "react-redux";
import { getActionById, updateActionById } from '../../actions'
import CanUpdate from '../../components/subComponents/CanUpdate'
import convertTime from '../../utils/convertTime'

const Action = ({ match }) => {
  const [editing, setEditing] = useState(false)
  const [modal, setModal] = useState(false);

  const { details } = useSelector(state => state.action)
  const userPermissions = useSelector(state => state.me.actions);

  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [description, setDescription] = useState('');
  const [isDefault, setIsDefault] = useState(true);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getActionById(match.params.id))
    setName(details.name)
    setCode(details.code)
    setDescription(details.description)
    setIsDefault(details.isDefault)
  }, [details.code, details.description, details.isDefault, details.name, dispatch, match.params.id])

  const handleEditClick = () => {
    setEditing(true)
  }
  const handleBackClick = () => {
    setEditing(false)
  }
  const handleYesClick = () => {
    const values = {
      name, code,
      description, isDefault
    }
    dispatch(updateActionById(match.params.id, values))
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
            Action: {details.name || 'UNKNOW'}
          </CCardHeader>
          <CCardBody>
            {
              Object.getOwnPropertyNames(details).length > 0 ? (
                <CForm>
                    <CFormLabel >Name</CFormLabel >
                    <CFormInput
                      type="string"
                      disabled={!editing}
                      value={name}
                      onChange={v => setName(v.target.value)
                      }
                    />
                    <CFormLabel  >Code</CFormLabel >
                    <CFormInput
                      type="string"
                      disabled={true}
                      value={code}
                      onChange={v => setCode(v.target.value)}
                    />
                    <CFormLabel  >Description</CFormLabel >
                    <CFormInput
                      disabled={!editing}
                      type="string"
                      value={description}
                      onChange={v => setDescription(v.target.value)}
                    />
                    <span>
                      <CFormLabel >Default</CFormLabel >
                        <CFormCheck
                          style={{ transform: 'scale(1.5)' }}
                          disabled={!editing}
                          type="checkbox"
                          className="ml-3"
                          checked={isDefault}
                          onChange={() => setIsDefault(!isDefault)}
                        />
                    </span>
                    <CFormLabel  >Create At</CFormLabel >
                    <CFormInput
                      type="string"
                      disabled={true}
                      value={convertTime(details.createdAt)}
                    />
                    <CFormLabel  >Update At</CFormLabel >
                    <CFormInput
                      type="string"
                      disabled={true}
                      value={convertTime(details.updatedAt)}
                    />
                </CForm>)
                :
                (<span><CIcon className="text-muted" name="cui-icon-ban" /> Not found</span>)
            }
          </CCardBody>
        </CCard>
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
      </CCol>
     </CRow>
  )
}

export default Action
