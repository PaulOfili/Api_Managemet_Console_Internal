import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import { createClient, getClient, getClients, updateClient, updatePassportClient } from "../clientsThunks";
import types from "../../clientsConstants";
import * as alertConstants from "../../../../alert";

import fetchMock from "fetch-mock";

import clients_API from '../../../../request/endpoints';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const clientID = ''
describe("async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("creates GET_CLIENTS_SUCCESS when a request is sent", () => {
    fetchMock.getOnce(clients_API.getClients().url, {
      body: { response: [] },
      headers: { "content-type": "application/json" }
    });

    const expectedActions = [
      { type: types.GET_CLIENTS },  
      {
        payload:{
          scope: "default"
        },
        type: "loading-bar/SHOW"
      },
      {
        payload:{
          scope: "default"
        },
        type: "loading-bar/HIDE"
      },
      {
        payload:{
          alertType: "success",
          message: "successfully loaded clients"
        },
        type: alertConstants.SHOW_ALERT
      },
      {
        type: types.GET_CLIENTS_SUCCESS,
        response: { response: [] }
      }
    ];
    const store = mockStore({ todos: [] });
    return store.dispatch(getClients()).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(5);
      expect(actions).toEqual(expectedActions);
    });
  });

  it("creates GET_CLIENT_SUCCESS when a request is sent", () => {
    fetchMock.getOnce(clients_API.getPassportClient(clientID).url, {
        body: { response: {} },
        headers: { "content-type": "application/json" }
      });

    fetchMock.getOnce(clients_API.getClient(clientID).url, {
        body: { response: {} },
        headers: { "content-type": "application/json" }
    });
    const expectedActions = [
        { type: types.GET_CLIENT },  
        {
          payload:{
            scope: "default"
          },
          type: "loading-bar/SHOW"
        },
        {
          payload:{
            scope: "default"
          },
          type: "loading-bar/HIDE"
        },
        {
          payload:{
            alertType: "success",
            message: "successfully loaded client"
          },
          type: alertConstants.SHOW_ALERT
        },
        {
            type: types.GET_PASSPORT_CLIENT_SUCCESS,
            response: { response: {} }
          },
        {
          type: types.GET_CLIENT_SUCCESS,
          response: { response: {} }
        }
    ];
    const store = mockStore({ todos: [] });

    return store.dispatch(getClient(clientID)).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(6);
      expect(actions).toEqual(expectedActions);
    });
  });
  
  it("creates SAVE_CLIENT_SUCCESS when a request is sent", () => {
    fetchMock.postOnce(clients_API.updatePassportClient().url, {
      body: { response: {} },
      headers: { "content-type": "application/json" }
    });

    const store = mockStore({ todos: [] });

    const expectedActions = [
      { type: types.SAVE_CLIENT },
      {
        response: { response: {}},
        type: types.SAVE_CLIENT_SUCCESS
      },
      {
        payload:{
          alertType: "success",
          message: "successfully updated"
        },
        type: alertConstants.SHOW_ALERT
      },
      {
        payload:{
          scope: "default"
        },
        type: "loading-bar/SHOW"
      },
      {
        payload:{
          scope: "default"
        },
        type: "loading-bar/HIDE"
      },
    ];

    return store.dispatch(updatePassportClient({})).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(5);
      expect(actions).toEqual(expectedActions);
    });
  });

  it("creates SAVE_CLIENT_SUCCESS when a request is sent", () => {
    fetchMock.postOnce(clients_API.updateClient().url, {
      body: { response: {} },
      headers: { "content-type": "application/json" }
    });

    const store = mockStore({ todos: [] });

    const expectedActions = [
      { type: types.SAVE_CLIENT },
      {
        response: { response: {}},
        type: types.SAVE_CLIENT_SUCCESS
      },
      {
        payload:{
          alertType: "success",
          message: "successfully updated"
        },
        type: alertConstants.SHOW_ALERT
      },
      {
        payload:{
          scope: "default"
        },
        type: "loading-bar/SHOW"
      },
      {
        payload:{
          scope: "default"
        },
        type: "loading-bar/HIDE"
      },
    ];

    return store.dispatch(updateClient({})).then(() => {
      const actions = store.getActions();
      expect(actions.length).toBe(5);
      expect(actions).toEqual(expectedActions);
    });
  });
});
