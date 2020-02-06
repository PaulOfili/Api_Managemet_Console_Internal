const system = {
    appName: 'API_Gateway Dashboard',
    serverBaseUrl: process.env.NODE_ENV === 'development' ? 'http://api-management-gateway-uat.k8.isw.la' : window._env_.REACT_APP_HOST_NAME,
    imageBaseUrl: 'https://mufasa.interswitchng.com/p/iswportal/images/interswitch_blue.png'
};

export default system;