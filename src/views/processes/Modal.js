/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
import React, { forwardRef, } from 'react'
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'

const Modal = forwardRef(({ modal, toggleModal, onYes, info }, ref) => {
  return (
    <CModal
      ref={ref}
      show={modal}
      onClose={() => toggleModal()}
      color="info"
    >
      <CModalHeader closeButton>
        <CModalTitle>Alert</CModalTitle>
      </CModalHeader>
      <CModalBody> {`Do you want to ${info.action} ${info.name}?`}</CModalBody>
      <CModalFooter>
        <CButton color="info" onClick={() => onYes(info.name)}>Yes</CButton>{' '}
        <CButton color="danger" onClick={() => toggleModal()}>No</CButton>
      </CModalFooter>
    </CModal>
  )
})

export default Modal
