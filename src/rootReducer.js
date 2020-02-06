import {combineReducers} from "redux";
import { loadingBarReducer } from 'react-redux-loading-bar'
import account from './components/Landing/reducer/accountReducer';
import alert from './alert';
import apis from './components/Routes/routesReducer';
import routesEnvironment from './components/RoutesEnvironment/routesEnvironmentReducer'
import audits from './components/Audits/auditReducer';
import clients from './components/Clients/clientsReducer';
import modal from './components/Modals/reducers';
import products from './components/Products/productsReducer';
import users from './components/Users/usersReducer';

const appReducer = combineReducers({
    account,
    alert,
    apis,
    routesEnvironment,
    audits,
    clients,
    loadingBar: loadingBarReducer,
    modal,
    products,
    users
});


export default appReducer;


