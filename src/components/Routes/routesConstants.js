import keyMirror  from 'key-mirror';

export default keyMirror({
  GET_ROUTES: null,
  GET_ROUTES_SUCCESS: null,
  GET_ROUTES_FAILURE: null,
  GET_ROUTE: null,
  GET_ROUTE_SUCCESS: null,
  GET_ROUTE_FAILURE: null,
  SAVE_ROUTE:null,
  SAVE_ROUTE_SUCCESS: null,
  SAVE_ROUTE_FAILURE: null,
  DELETE_ROUTE: null,
  DELETE_ROUTE_SUCCESS: null,
  DELETE_ROUTE_FAILURE: null,
  REFRESH_ROUTE: null,
  REFRESH_ROUTE_SUCCESS: null,
  REFRESH_ROUTE_FAILURE: null,
  SET_ROUTE: null,
});

export const predicateOptions = [

  {
    key: 'After',
    text: 'After',
    value: 'After'
  },
  {
    key: 'Before',
    text: 'Before',
    value: 'Before',
  },
  {
    key: 'Between',
    text: 'Between',
    value: 'Between',
  },
  {
    key: 'Cookie',
    text: 'Cookie',
    value: 'Cookie',
  },
  {
    key: 'Header',
    text: 'Header',
    value: 'Header',
  },
  {
    key: 'Host',
    text: 'Host',
    value: 'Host',
  },
  {
    key: 'Method',
    text: 'Method',
    value: 'Method',
  },
  {
    key: 'Path',
    text: 'Path',
    value: 'Path',
  },
  {
    key: 'Query',
    text: 'Query',
    value: 'Query',
  },
  {
    key: 'RemoteAddr',
    text: 'RemoteAddr',
    value: 'RemoteAddr',
  },
]

export const filterOptions = [
  {
    key: 'AddRequestHeader',
    text: 'AddRequestHeader',
    value: 'AddRequestHeader',
  },
  {
    key: 'AddResponseHeader',
    text: 'AddResponseHeader',
    value: 'AddResponseHeader',
  },
  {
    key: 'AddRequestParameter',
    text: 'AddRequestParameter',
    value: 'AddRequestParameter',
  },
  {
    key: 'Hystrix',
    text: 'Hystrix',
    value: 'Hystrix',
  },
  {
    key: 'PrefixPath',
    text: 'PrefixPath',
    value: 'PrefixPath',
  },
  // {
  //   key: 'PreserveHostHeader',
  //   text: 'PreserveHostHeader',
  //   value: 'PreserveHostHeader',
  // },
  {
    key: 'RedirectTo',
    text: 'RedirectTo',
    value: 'RedirectTo',
  },
  {
    key: 'RemoveRequestHeader',
    text: 'RemoveRequestHeader',
    value: 'RemoveRequestHeader',
  },
  {
    key: 'RemoveResponseHeader',
    text: 'RemoveResponseHeader',
    value: 'RemoveResponseHeader',
  },
  {
    key: 'RewritePath',
    text: 'RewritePath',
    value: 'RewritePath',
  },
  {
    key: 'RewriteResponseHeader',
    text: 'RewriteResponseHeader',
    value: 'RewriteResponseHeader',
  },
  // {
  //   key: 'SaveSession',
  //   text: 'SaveSession',
  //   value: 'SaveSession',
  // },
  {
    key: 'SetPath',
    text: 'SetPath',
    value: 'SetPath',
  },
  {
    key: 'SetResponseHeader',
    text: 'SetResponseHeader',
    value: 'SetResponseHeader',
  },
  {
    key: 'SetStatus',
    text: 'SetStatus',
    value: 'SetStatus',
  },
  {
    key: 'StripPrefix',
    text: 'StripPrefix',
    value: 'StripPrefix',
  },
  {
    key: 'RequestSize',
    text: 'RequestSize',
    value: 'RequestSize',
  }
]