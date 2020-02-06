import React from 'react';
import { Route, Switch } from "react-router-dom";

const Clients = React.lazy(() => import('./components/Clients'));
const Client = React.lazy(() => import('./components/Clients/Project'));
const Main = React.lazy(() => import('./components/Main'));
const CreateAPIs = React.lazy(() => import('./components/APIs/CreateAPI'));
const updateAPIs = React.lazy(() => import('./components/APIs/UpdateAPI'));
const APIs = React.lazy(() => import('./components/Products'));
const Audits = React.lazy(() => import('./components/Audits'));
const Users = React.lazy(() => import('./components/Users'));
const RegisterUser = React.lazy(() => import('./components/Users/RegisterUser'));
const User = React.lazy(() => import('./components/Users/User'));
// const ViewRoute = React.lazy(() => import('./components/Main/MainRoute'));

// https://github.com/ReactTraining/react-router/tree/master/packages/react-router-config

const MainRoutes = [
  { key: 'main', exact: true, path: '/dashboard/main', name: 'Main', component: Main },
  // { key: 'viewRoute', exact: true, path: '/dashboard/main/routes/view/:id', name: 'ViewRoute', component: ViewRoute },
]

export const MainWrapper = () => (
  <Switch>
    {
      MainRoutes.map(route => (
       <Route
          key={route.key}
          exact={route.exact}
          path={route.path}
          name={route.name}
          component={route.component}
      /> 
      ))
    }
  </Switch>
)
const ClientRoutes = [
  { key: 'clients', exact: true, path: '/dashboard/clients', name: 'Clients', component: Clients },
  { key: 'viewClients', exact: false, path: '/dashboard/clients/view/:id', name: 'Client', component: Client },
]

export const ClientWrapper = () => (
  <Switch>
    {
      ClientRoutes.map(route => (
       <Route
          key={route.key}
          exact={route.exact}
          path={route.path}
          name={route.name}
          component={route.component}
      /> 
      ))
    }
  </Switch>
)

const APIRoutes = [
  { key: 'apis', exact: true, path: '/dashboard/apis', name: 'APIs', component: APIs },
  { key: 'addAPIs', exact: false, path: '/dashboard/apis/create', name: 'Create APIs', component: CreateAPIs },
  { key: 'viewAPIs', exact: false, path: '/dashboard/apis/view/:id', name: 'API', component: updateAPIs },
]

export const APIsWrapper = () => (
  <Switch>
    {
      APIRoutes.map(route => (
       <Route
          key={route.key}
          exact={route.exact}
          path={route.path}
          name={route.name}
          component={route.component}
      /> 
      ))
    }
  </Switch>
)



const UsersRoutes = [
  { key: 'users', exact: true, path: '/dashboard/users', name: 'Users', component: Users },
  { key: 'addUser', exact: false, path: '/dashboard/users/register', name: 'RegisterUser', component: RegisterUser },
  { key: 'viewUser', exact: false, path: '/dashboard/users/view/:id', name: 'User', component: User },
  
];

export const UserWrapper = () => (
  <Switch>
    {
      UsersRoutes.map(route => (
       <Route
          key={route.key}
          exact={route.exact}
          path={route.path}
          name={route.name}
          component={route.component}
      /> 
      ))
    }
  </Switch>
)

const AuditsRoutes = [
  { key: 'audits', exact: true, path: '/dashboard/audits', name: 'Audits', component: Audits },
  
];

export const AuditsWrapper = () => (
  <Switch>
    {
      AuditsRoutes.map(route => (
       <Route
          key={route.key}
          exact={route.exact}
          path={route.path}
          name={route.name}
          component={route.component}
      /> 
      ))
    }
  </Switch>
)



