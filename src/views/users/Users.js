/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import {
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CPagination
} from '@coreui/react'
// eslint-disable-next-line prettier/prettier
import { useSelector, useDispatch } from "react-redux";
import { CSmartTable } from '@coreui/react-pro'
import { getListUser } from '../../actions';
import CanView from '../../components/subComponents/CanView';
import convertTime from '../../utils/convertTime'
const getBadge = status => {
  switch (status) {
    case 1: return 'success'
    case 2: return 'danger'
    default: return 'primary'
  }
}

const covertStatus = status => {
  switch (status) {
    case 1: return 'Active'
    case 2: return 'Banned'
    default: return 'primary'
  }
}

const Users = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const [page, setPage] = useState(currentPage)
  const [size, setSize] = useState(10)
  const { list } = useSelector(state => state.user)
  const userPermissions = useSelector(state => state.me.actions);
  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/users?page=${newPage}`)
    setPage(newPage)
    dispatch(getListUser(size, page))
  }

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    dispatch(getListUser(size, page))

  }, [currentPage, dispatch, page, size])

  return (userPermissions.length &&
    <CanView permissions={userPermissions} resource={'User'}>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              Users
          </CCardHeader>
            <CCardBody>
              <CSmartTable
                onPaginationChange={(s) => setSize(s)}
                itemsPerPageSelect
                items={list.rows}
                fields={[
                  {
                    key: 'fullName',
                    _classes: 'font-weight-bold',
                    label: 'Full Name'
                  },
                  {
                    key: 'birthday',
                    label: 'Birthday',
                  },
                  'email',
                  'createdAt',
                  'status',
                ]}
                hover
                striped
                itemsPerPage={size}
                clickableRows
                onRowClick={(item) => history.push(`/users/${item.id}`)}
                scopedSlots={{
                  'status':
                    (item) => (
                      <td>
                        <CBadge color={getBadge(item.status)}>
                          {covertStatus(item.status)}
                        </CBadge>
                      </td>),
                  'createdAt': item => (<td>{convertTime(item.createdAt)}</td>)
                }}
              />
              {Math.ceil(list.count / size) > 1
                && <CPagination
                  activePage={page}
                  onActivePageChange={pageChange}
                  pages={Math.ceil(list.count / size)}
                  doubleArrows={false}
                  align="center"
                />}
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CanView>
  )
}

export default Users
