import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import {Client} from "../Client";
import * as clientRequests from '../actions/clientsThunks';

Enzyme.configure({ adapter: new Adapter() });

function setup() {
  const props = {
    client: {},
    passportClient: {},
    isLoading: false,
    dispatch: jest.fn(),
    match: {
        params: {
            id: '1'
        }
    },
    ...clientRequests
  };
  const enzymeWrapper = shallow(<Client {...props} />);
  return {
    props,
    enzymeWrapper
  };
}

describe("components", () => {
  describe("Client", () => {
    it("To match snapshot", () => {
      const { enzymeWrapper } = setup();
      expect(enzymeWrapper).toMatchSnapshot();
    });
  });
});
