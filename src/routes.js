/* eslint-disable prettier/prettier */
import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
const ViewCall = React.lazy(() => import('./views/viewCall/Dashboard'))

const CreateAction = React.lazy(() => import('./views/actions/CreateAction'))
const Actions = React.lazy(() => import('./views/actions/Actions'))
const Action = React.lazy(() => import('./views/actions/Action'))

const Role = React.lazy(() => import('./views/roles/Role'));
const Roles = React.lazy(() => import('./views/roles/Roles'));
const CreateRole = React.lazy(() => import('./views/roles/Create'));

const Apps = React.lazy(() => import('./views/apps/Apps'));
const App = React.lazy(() => import('./views/apps/App'));
const WokerTimer = React.lazy(() => import('./views/apps/Timer'));
const ListWoker = React.lazy(() => import('./views/apps/Workers'));

const Users = React.lazy(() => import('./views/users/Users'));
const User = React.lazy(() => import('./views/users/User'));

const Processes = React.lazy(() => import('./views/processes/Processes'));


const Test = React.lazy(() => import('./views/test/Test'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', component: Dashboard },
  { path: '/viewCall/:id', exact: true, name: 'View', component: ViewCall },

  { path: '/actions/create', exact: true, name: 'Create', component: CreateAction },
  { path: '/actions/:id', exact: true, name: 'Details', component: Action },
  { path: '/actions', exact: true, name: 'Actions', component: Actions },

  { path: '/roles/create', exact: true, name: 'Create', component: CreateRole },
  { path: '/roles/:id', exact: true, name: 'Details', component: Role },
  { path: '/roles', exact: true, name: 'Roles', component: Roles },

  { path: '/apps/list/:id/workers', exact: true, name: 'Wokers', component: ListWoker },
  { path: '/apps/worker', exact: true, name: 'Add Woker', component: WokerTimer },
  { path: '/apps/list/:id', exact: true, name: 'Details', component: App },
  { path: '/apps/list', exact: true, name: 'Apps', component: Apps },

  { path: '/users/:id', exact: true, name: 'Details', component: User },
  { path: '/users', exact: true, name: 'Users', component: Users },

  { path: '/processes', exact: true, name: 'Processes', component: Processes },

  { path: '/test', exact: true, name: 'Test', component: Test },
]

export default routes
