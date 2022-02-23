/* eslint-disable no-unused-vars */
/* eslint-disable prettier/prettier */
import React from 'react'
import CIcon from '@coreui/icons-react'
import { 
  cilSpeedometer, 
  cilApps, 
  cilUser, 
  cilShieldAlt,
  cilPeople,
  cilBullhorn
} from '@coreui/icons'
import { 
  // CNavGroup, 
  CNavItem 
} from '@coreui/react'

const _nav = [
  {
    component: CNavItem,
    name: 'Dashboard',
    to: '/',
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  // {
  //   component: CNavGroup,
  //   name: 'App',
  //   to: '/app',
  //   icon: <CIcon icon={cilApps} customClassName="nav-icon" />,
  //   items: [
  //     {
  //       component: CNavItem,
  //       name: 'List',
  //       to: '/apps/list',
  //     },
  //     {
  //       component: CNavItem,
  //       name: 'Worker',
  //       to: '/apps/worker',
  //     },
  //   ],
  // },
  {
    component: CNavItem,
    name: 'User',
    to: '/users',
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
    badge: {
      color: 'info',
    },
  },
  // {
  //   component: CNavItem,
  //   name: 'Role',
  //   to: '/roles',
  //   icon: <CIcon icon={cilShieldAlt} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //   },
  // },
  // {
  //   component: CNavItem,
  //   name: 'Permission',
  //   to: '/permissions',
  //   icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //   },
  // },
  // {
  //   component: CNavItem,
  //   name: 'Action',
  //   to: '/actions',
  //   icon: <CIcon icon={cilBullhorn} customClassName="nav-icon" />,
  //   badge: {
  //     color: 'info',
  //   },
  // },
]

export default _nav
