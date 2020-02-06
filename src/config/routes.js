import React from 'react';
import { Redirect } from 'react-router-dom';
import Helpers from '../utils/Helpers';
import HomeConfig from '../screens/Home/HomeConfig';
import DashboardConfig from '../screens/Dashboard/DashboardConfig';

const routeConfigs = [
    DashboardConfig,
    HomeConfig
];

const routes = [
    ...Helpers.generateRoutesFromConfigs(routeConfigs),
    {
        component: () => <Redirect to="/404"/>
    }
];

export default routes;
