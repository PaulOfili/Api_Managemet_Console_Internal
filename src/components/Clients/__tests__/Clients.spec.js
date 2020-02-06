import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Clients} from "../Clients";
import * as clientRequests from '../actions/clientsThunks';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    clients: [],
    isLoading: false,
    dispatch: jest.fn(),
    ...clientRequests
  };
  const enzymeWrapper = shallow(<Clients {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Clients", () => {
    it("To match snapshot", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
