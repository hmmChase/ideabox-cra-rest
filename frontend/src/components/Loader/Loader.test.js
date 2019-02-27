import React from 'react';
import { shallow } from 'enzyme';
import Loader from './Loader';

describe('Loader', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {};
    wrapper = shallow(<Loader {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
