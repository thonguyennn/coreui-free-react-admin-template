/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
/* eslint-disable prettier/prettier */
import React, { useState, useEffect } from 'react'
import { useLocation, useHistory } from 'react-router-dom'
import {
  CButton,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CRow,
  CPagination,
  CBadge
} from '@coreui/react'
import { CSmartTable } from '@coreui/react-pro'
import CIcon from '@coreui/icons-react'
import { useDispatch } from "react-redux";
import {
  addToast,
  getListProcess,
  restartProcess,
  restartAllProcess,
} from '../../actions';
// import CanView from '../../components/CanView';
import ModalProcess from './Modal';

const Processes = () => {
  const history = useHistory()

  const [info, setInfo] = useState({ name: '', action: '' });

  const [modalRestart, setModalRestart] = useState(false);
  const [modalRestartAll, setModalRestartAll] = useState(false);

  const dispatch = useDispatch()
  const queryPage = useLocation().search.match(/page=([0-9]+)/, '')
  const currentPage = Number(queryPage && queryPage[1] ? queryPage[1] : 1)
  //   const userPermissions = useSelector(state => state.me.actions);

  const [list, setList] = useState(null);
  const [page, setPage] = useState(currentPage)
  const [size, setSize] = useState(10);

  const getBadge = status => {
    switch (status) {
      case 'online':
        return 'success'
      case 'stopped':
        return 'danger'
      case 'errored':
        return 'danger'
      default:
        return 'primary'
    }
  }

  const toggleModalRestart = (name) => {
    setInfo({ name, action: 'restart' })
    setModalRestart(!modalRestart);
  }

  const toggleModalRestartAll = () => {
    setInfo({ name: '', action: 'restart all' })
    setModalRestartAll(!modalRestartAll);
  }

  const pageChange = newPage => {
    currentPage !== newPage && history.push(`/processes?page=${newPage}`)
  }
  async function fetchProcesses() {
    let data = await getListProcess()
    setList(data);
  }
  useEffect(() => {
    currentPage !== page && setPage(currentPage)
    fetchProcesses()
  }, [currentPage, page])

  const handleAction = async (name, actionFn) => {
    try {
      const res = await actionFn(name)
      const status = res.status;
      const { message } = res.data;
      dispatch(addToast({ status, message }))
      setTimeout(() => {
        fetchProcesses()
      }, 1000)
      return
    } catch (error) {
      const res = error.response;
      const status = res.status;
      const { message } = res.data;
      return dispatch(addToast({ status, message }))
    }
  }

  const handleRestart = async (name) => {
    toggleModalRestart();
    await handleAction(name, restartProcess)
  }

  const handleRestartAll = async () => {
    toggleModalRestartAll()
    await handleAction(null, restartAllProcess)
  }
  return (
    // <CanView permissions={userPermissions} resource={'App'}>
    <CRow>
      <CCol xl={12}>
        <CCard>
          <CCardHeader>
            {/* <p>Processes</p> */}
            <CButton
              className="mx-2"
              color='info'
              onClick={() => toggleModalRestartAll()}
            >Restart All</CButton>
          </CCardHeader>
          <CCardBody>
            <CSmartTable
              itemsPerPage={size}
              activePage={page}
              itemsPerPageSelect
              onPaginationChange={(s) => setSize(s)}
              items={list}
              fields={[
                {
                  key: 'pm_id',
                  _classes: 'font-weight-bold',
                  label: 'Id'
                },
                {
                  key: 'name',
                  label: 'Name'
                },
                {
                  key: 'pid',
                  label: 'PID'
                },
                {
                  key: 'memory',
                  label: 'Memory'
                },
                {
                  key: 'cpu',
                  label: 'CPU'
                },

                {
                  key: 'status',
                  label: 'Status'
                },
                {
                  key: 'action',
                  label: 'Action'
                }
              ]}
              hover
              striped
              scopedSlots={{
                'memory': item => (<td>{(item.monit.memory / 1048576).toFixed(2)}MB</td>),
                'cpu': item => (<td>{item.monit.cpu}%</td>),
                'status': item => (
                  <td>
                    <CBadge color={getBadge(item.pm2_env.status)}>
                      {item.pm2_env.status}
                    </CBadge>
                  </td>
                ),
                'action': item => (
                  <td>
                    <CIcon
                      title="Restart"
                      style={{
                        'cursor': 'pointer',
                      }}
                      name="cil-reload"
                      onClick={() => toggleModalRestart(item.name)}
                    />
                  </td>
                ),
              }}
            />
            <CPagination
              activePage={page}
              onActivePageChange={pageChange}
              pages={Math.ceil(list?.length / size)}
              doubleArrows={false}
              align="center"
            />
            <ModalProcess
              modal={modalRestart}
              toggleModal={toggleModalRestart}
              onYes={handleRestart}
              info={info}
            />
            <ModalProcess
              modal={modalRestartAll}
              toggleModal={toggleModalRestartAll}
              onYes={handleRestartAll}
              info={info}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
    // </CanView>
  )
}

export default Processes
