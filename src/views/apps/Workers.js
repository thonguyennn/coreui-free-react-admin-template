/* eslint-disable react/prop-types */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
} from '@coreui/react'
import { CSmartTable } from '@coreui/react-pro'
import { useSelector, useDispatch } from "react-redux";
import { getListWorker } from '../../actions';
import CanView from '../../components/subComponents/CanView';
import convertTime from '../../utils/convertTime';

const ListWoker = ({ match }) => {
  const dispatch = useDispatch()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  const userPermissions = useSelector(state => state.me.actions);
  const [page, setPage] = useState(currentPage)
  const [list, setList] = useState({ count: 0, rows: [] })

  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    async function fetchWorker() {
      let data = await getListWorker(match.params.id)
      setList(data);
    }
    fetchWorker()

  }, [currentPage, dispatch, match.params.id, page])

  return (userPermissions.length &&
    <CanView permissions={userPermissions} resource={'App'}>
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              <div className={'row my-2 mx-0'}>
                <div className="col-sm-6 form-inline p-0 c-datatable-filter">
                  <label className="mfe-2">List Worker</label>
                </div>
              </div>
            </CCardHeader>
            <CCardBody>
              <CSmartTable 
                items={list.rows}
                fields={[
                  {
                    key: 'host',
                    label: 'Host'
                  },
                  {
                    key: 'db',
                    label: 'DB'
                  },
                  {
                    key: 'start_time',
                    label: 'Start Time'
                  },
                  {
                    key: 'end_time',
                    label: 'End Time'
                  },
                ]}
                scopedSlots={{
                  'start_time': item => (<td>{convertTime(item.start_time)}</td>),
                  'end_time': item => (<td>{convertTime(item.end_time)}</td>)
                }}
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CanView>
  )
}

export default ListWoker
