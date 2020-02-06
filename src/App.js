import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Loadable from 'react-loadable';
import PrivateRoute from './AuthorizedRoute';
import large_logo from './assets/img/brand/new_logo.png';
import './App.scss';

const loading = () => <div className="d-flex align-items-center justify-content-center" style={{ position: 'fixed', top: '0', bottom: '0', left: '0', right: '0'}}><img src={large_logo} style={{ position: 'fixed', width: '300px', height: '150px'}} alt='Developer Console'/></div>;

// Landing
const Landing = Loadable({
  loader: () => import('./components/Landing'),
  loading
});

// Pages
const Container = Loadable({
  loader: () => import('./components/Container'),
  loading
});

function App() {
  return (
    <BrowserRouter>
          <Switch>
            <Route exact path="/" name="Home" component={Landing} />
            <PrivateRoute path="/dashboard" name="Dashboard" component={Container} />
          </Switch>
      </BrowserRouter>
  );
}

export default App;
