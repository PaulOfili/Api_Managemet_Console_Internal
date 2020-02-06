import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {ClientsTable} from "../ClientsTable";
import * as clientRequests from '../actions/clientsThunks';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    client: {},
    clients: [],
    passportClient: {},
    dispatch: jest.fn(),
    isLoading: false,
    ...clientRequests
  };
  const enzymeWrapper = shallow(<ClientsTable {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("ClientsTable", () => {
    it("To match snapshot", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
