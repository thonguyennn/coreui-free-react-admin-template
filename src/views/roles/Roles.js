/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CPagination,
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CTooltip,
} from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { CSmartTable } from '@coreui/react-pro'
import { useSelector, useDispatch } from "react-redux";
import { getListRole, deleteRole } from '../../actions';
import CanView from '../../components/subComponents/CanView';
import CanCreate from '../../components/subComponents/CanCreate';
import convertTime from '../../utils/convertTime'

const Roles = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)

  const [page, setPage] = useState(currentPage)
  const [modal, setModal] = useState(false);
  const [size, setSize] = useState(10)
  const [delId, setDelId] = useState(null);

  const { list } = useSelector(state => state.role)
  const userPermissions = useSelector(state => state.me.actions);

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/roles?page=${newPage}`)
    setPage(newPage)
    dispatch(getListRole(size, page))
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    dispatch(getListRole(size, page))

  }, [currentPage, dispatch, page, size])

  const handleDelete = (id) => {
    setDelId(id)
    setModal(!modal);
  }
  const handleYesClick = async () => {
    await dispatch(deleteRole(delId))
    dispatch(getListRole(size, page))
    setModal(!modal);
  }
  const toggle = () => {
    setModal(!modal);
  }
  return (userPermissions.length &&
    <CanView permissions={userPermissions} resource={'Role'}>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <div className={'row my-2 mx-0'}>
                <div className="col-sm-6 form-inline p-0 c-datatable-filter">
                  <label className="mfe-2">Roles</label>
                </div>
                <CanCreate permissions={userPermissions} resource={'Role'}>
                  <div className={'col-sm-6 p-0'}>
                    <div className={'form-inline justify-content-sm-end c-datatable-items-per-page'}>
                      <CButton color='info' onClick={() => history.push('/roles/create')}>Add</CButton>
                    </div>
                  </div>
                </CanCreate>
              </div>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                hover={false}
                onPaginationChange={(s) => setSize(s)}
                itemsPerPageSelect
                items={list.rows}
                fields={[
                  {
                    key: 'name',
                    _classes: 'font-weight-bold',
                    label: 'Name'
                  },
                  {
                    key: 'code',
                    label: 'Code',
                  },
                  'description',
                  'createdAt',
                  'updatedAt',
                  {
                    key: 'delete',
                    label: '',
                  },
                ]}
                striped
                itemsPerPage={size}
                scopedSlots={{
                  'delete':
                    (item) => {
                      if (['admin', 'member', 'moderator'].includes(item.code)) {
                        return <td>
                          <CTooltip content='Details'>
                            <CIcon
                              style={{
                                'cursor': 'pointer',
                                'marginRight': '10px '
                              }}
                              name="cil-pencil"
                              onClick={() => history.push(`/roles/${item.id}`)}
                            />
                          </CTooltip>
                        </td>
                      }
                      return (
                        <td>
                          <CTooltip content='Details'>
                            <CIcon
                              style={{
                                'cursor': 'pointer',
                                'marginRight': '10px '
                              }}
                              name="cil-pencil"
                              onClick={() => history.push(`/roles/${item.id}`)}
                            />
                          </CTooltip>
                          <CTooltip content='Delete'>
                            <CIcon
                              style={{ 'cursor': 'pointer' }}
                              name="cil-trash"
                              onClick={() => handleDelete(item.id)}
                            />
                          </CTooltip>
                        </td>)
                    },
                  'createdAt': item => (<td>{convertTime(item.createdAt)}</td>),
                  'updatedAt': item => (<td>{convertTime(item.updatedAt)}</td>)
                }}
              />
              {Math.ceil(list.count / size) > 1
                && <CPagination
                  activePage={page}
                  onActivePageChange={pageChange}
                  pages={Math.ceil(list.data.count / size)}
                  doubleArrows={false}
                  align="center"
                />}
              <CModal
                show={modal}
                onClose={toggle}
              >
                <CModalBody>
                  Do you want delete this role?
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
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CanView>
  )
}

export default Roles
