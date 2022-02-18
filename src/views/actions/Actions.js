/* eslint-disable prettier/prettier */
import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormCheck,
  CButton
} from '@coreui/react'
import { useSelector, useDispatch } from "react-redux";
import { CSmartTable } from '@coreui/react-pro'
import { getListAction } from '../../actions';
import CanView from '../../components/subComponents/CanView';
import CanCreate from '../../components/subComponents/CanCreate';
const Actions = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { list } = useSelector(state => state.action)
  const userPermissions = useSelector(state => state.me.actions);

  useEffect(() => {
    async function fetch() {
      await dispatch(getListAction())
    }
    fetch()
  }, [dispatch])

  return (userPermissions.length &&
    <CanView permissions={userPermissions} resource={'Action'}>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <div className={'row my-2 mx-0'}>
                <div className="col-sm-6 form-inline p-0 c-datatable-filter">
                  <label className="mfe-2">Actions</label>
                </div>
                <CanCreate permissions={userPermissions} resource={'Action'}>
                  <div className={'col-sm-6 p-0'}>
                    <div className={'form-inline justify-content-sm-end c-datatable-items-per-page'}>
                      <CButton color='info' onClick={() => history.push('/actions/create')}>Add</CButton>
                    </div>
                  </div>
                </CanCreate>
              </div>
            </CCardHeader>
            <CCardBody>
              <CSmartTable
                items={list.rows}
                fields={[
                  {
                    key: 'name',
                    _classes: 'font-weight-bold',
                    label: 'Action'
                  },
                  {
                    key: 'code',
                    label: 'Code',
                  },
                  {
                    key: 'description',
                    label: 'Description',
                  },
                  {
                    key: 'isDefault',
                    label: 'Default',
                  },
                ]}
                hover
                striped
                clickableRows
                onRowClick={(item) => history.push(`/actions/${item.id}`)}
                scopedSlots={{
                  'isDefault':
                    (item) => (
                      <td>
                        <CFormCheck
                          type="checkbox"
                          className="ml-3"
                          defaultChecked={item.isDefault}
                        />
                      </td>)
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CanView>
  )
}

export default Actions
