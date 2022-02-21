/* eslint-disable react/jsx-key */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CFormSwitch
} from '@coreui/react'
import { useSelector, } from "react-redux";
import { getListApp, switchApp } from '../../actions';
import CanView from '../../components/subComponents/CanView';

const Apps = () => {
  const history = useHistory()
  const userPermissions = useSelector(state => state.me.actions);
  const [data, setData] = useState({ count: 0, rows: [] })

  const hanldeChangeSwitch = (id) => {
    setData({
      count: data.count,
      rows: data.rows.map(item => {
        return (item.id === id) ? { ...item, isRun: !item.isRun } : item;
      })
    });
    switchApp(id);
  }
  const fetchData = async () => {
    const data = await getListApp(100, 1);
    setData(data);
  }
  useEffect(() => {
    fetchData();
  }, [])

  return (userPermissions.length &&
    <CanView permissions={userPermissions} resource={'App'}>
      <CRow>
        {data?.rows?.map(item => {
          return <CCol xs="12" sm="6" md="3">
            <CCard>
              <CCardHeader>
                {item.app_name}
                <div className="card-header-actions">
                  <CFormSwitch
                    className={'float-right mb-0'}
                    color={'info'}
                    tabIndex={'0'}
                    size={'sm'}
                    checked={item.isRun}
                    onChange={_ => hanldeChangeSwitch(item.id)}
                  />
                </div>
              </CCardHeader>
              <CCardBody
                style={{ cursor: 'pointer' }}
                onClick={_ => history.push(`/apps/list/${item.id}`)}
              >
                <p>Redis: {item.redis_host}</p>
                <p>Key: {item.key_log}</p>
                <p>Key Error: {item.key_log_error}</p>
              </CCardBody>
            </CCard>
          </CCol>
        })}
      </CRow>
      <>
        {/*      
      <CRow>
        <CCol xl={12}>
          <CCard>
            <CCardHeader>
              List App
          </CCardHeader>
            <CCardBody>
              <CDataTable
                tableFilter={{ external: true, lazy: true, placeholder: 'app name' }}
                onTableFilterChange={handleFilterTableChange}
                onPaginationChange={(s) => setSize(s)}
                itemsPerPageSelect
                items={list.rows}
                fields={[
                  {
                    key: 'app_name',
                    _classes: 'font-weight-bold',
                    label: 'App Name'
                  },
                  {
                    key: 'app_id',
                    label: 'App ID'
                  },
                  {
                    key: 'log_id',
                    label: 'Log ID'
                  },
                  {
                    key: 'note',
                    label: 'Note'
                  },
                  {
                    key: 'core',
                    label: 'Current Core'
                  },
                ]}
                hover
                striped
                itemsPerPage={size}
                clickableRows
                onRowClick={(item) => history.push(`/apps/${item.id}`)}
              />
              <CPagination
                activePage={page}
                onActivePageChange={pageChange}
                pages={ Math.ceil(list.count / size)}
                doubleArrows={false}
                align="center"
              />
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
     */}
      </>
    </CanView>
  )
}

export default Apps
