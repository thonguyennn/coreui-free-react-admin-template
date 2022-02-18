/* eslint-disable prettier/prettier */
import React, { useEffect, useState } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CButtonGroup,
  CButton,
  CModal,
  CModalFooter,
  CModalBody,
  CPagination,
  CInputCheckbox
} from '@coreui/react'
import { useSelector, useDispatch } from "react-redux";
import { getListAction, getPermissions, updatePermissions } from "../../actions"
import CanView from '../../components/CanView';

const Permission = () => {
  const history = useHistory()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [size, setSize] = useState(10)
  const [editing, setEditing] = useState(false)
  const [modal, setModal] = useState(false);
  const [editedPerms, setEditedPerms] = useState([])

  const userPermissions = useSelector(state => state.me.actions);

  const { list: listAction } = useSelector(state => state.action);
  const { list: listPermission } = useSelector(state => state.permission);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getListAction())
    dispatch(getPermissions(size, page))
  }, [dispatch, page, size])

  const toggle = () => {
    setModal(!modal);
  }
  const handleCheckbox = (roleCode, actionCode) => {
    setEditing(true)
    const newPermissions = listPermission.rows.reduce((result, permission) => {
      if (permission.code === roleCode) {
        let newActions = permission.actions
        if (permission.actions.some(e => e.code === actionCode)) {
          newActions = newActions.filter(action => action.code !== actionCode)
        } else {
          newActions.push({
            code: actionCode
          })
        }
        permission.actions = newActions;
        setEditedPerms([...editedPerms.filter(e => e.code !== permission.code), permission])
        result.push(permission)
      } else {
        result.push(permission)
      }
      return result
    }, [])
    dispatch({
      type: 'SET_PERMISSION',
      payload: newPermissions
    })
  }
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
    dispatch(getPermissions(size, newPage))
    setPage(newPage)
  }
  const handleCancelKick = () => {
    setEditing(false);
    dispatch(getPermissions(size, page))
  }
  const handleChangePerms = async () => {
    await dispatch(updatePermissions(editedPerms))
    dispatch(getPermissions(size, page))
    setEditedPerms([]);
    setModal(!modal);
    setEditing(false);
  }
  return (userPermissions.length &&
    <CanView permissions={userPermissions} resource={'Permission'}>
      <CRow>
        <CCol lg={12}>
          <CCard>
            <CCardHeader>
            </CCardHeader>
            <CCardBody>

              <div className={'row my-2 mx-0'}>
                <div className={'col-sm-6 p-0 offset-sm-6'}>
                  <div className={'form-inline justify-content-sm-end c-datatable-items-per-page'}>
                    <label className={'mfe-2'}>Items per page: </label>
                    <select
                      className="form-control"
                      aria-label="changes number of visible items"
                      value={size}
                      onChange={e => setSize(e.target.value)}
                    >
                      <option val="5">5</option>
                      <option val="10">10</option>
                      <option val="20">20</option>
                      <option val="50">50</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="position-relative table-responsive">
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th></th>
                      {listAction.rows.map((action, index) => {
                        return (<th key={index} className={'font-weight-bold'}>
                          {action.name}
                        </th>)
                      })}
                    </tr>
                  </thead>
                  <tbody>
                    {listPermission.rows.map((permission, index) => {
                      return (<tr key={index}>
                        <th key={`${permission.code}-${index}`} scope="row">{permission.name}</th>
                        {listAction.rows.map(action => {
                          const permissionActions = permission.actions
                          if (permissionActions.some(e => e.code === action.code)) {
                            return <td key={action.code}>
                              <CInputCheckbox
                                disabled={permission.code === 'admin'}
                                type="checkbox"
                                className="ml-3"
                                checked={permissionActions.some(e => e.code === action.code)}
                                onChange={() => handleCheckbox(permission.code, action.code)}
                              />
                            </td>
                          }
                          return <td key={action.code}>
                            <CInputCheckbox
                              type="checkbox"
                              className="ml-3"
                              checked={permissionActions.some(e => e.code === action.code)}
                              onChange={() => handleCheckbox(permission.code, action.code)}
                            />
                          </td>
                        })}
                      </tr>)
                    })}
                  </tbody>
                </table>
              </div>
              {Math.ceil(listPermission.rows.length / 10) > 1
                && <CPagination
                  activePage={page}
                  onActivePageChange={pageChange}
                  pages={Math.ceil(listPermission.rows.length / 10)}
                  doubleArrows={false}
                  align="center"
                />}

              {editing ?
                (
                  <CButtonGroup>
                    <CButton
                      className="m-2"
                      color='danger'
                      onClick={handleCancelKick}
                    >
                      Cancel
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
                          onClick={handleChangePerms}
                        >
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
                null
              }
            </CCardBody>
          </CCard>
        </CCol>
      </CRow >
    </CanView>
  )
}

export default Permission
