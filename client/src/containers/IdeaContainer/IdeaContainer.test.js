import React from 'react';
import { shallow } from 'enzyme';
import {
  IdeaContainer,
  mapStateToProps,
  mapDispatchToProps
} from './IdeaContainer';
import * as thunk from '../../thunks';
jest.mock('../../thunks');

describe('IdeaContainer', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {
      stateIsLoading: false,
      stateHasErrored: false,
      stateIdeas: [{ id: 1, idea: 'mock idea' }, { id: 2, idea: 'mock idea' }],
      dispatchGetIdeas: jest.fn()
    };

    wrapper = shallow(<IdeaContainer {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with props.stateisLoading: true', () => {
    mockProps.stateIsLoading = true;

    wrapper = shallow(<IdeaContainer {...mockProps} />, {
      disableLifecycleMethods: true
    });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with props.stateHasErrored: true', () => {
    mockProps.stateHasErrored = true;

    wrapper = shallow(<IdeaContainer {...mockProps} />, {
      disableLifecycleMethods: true
    });

    expect(wrapper).toMatchSnapshot();
  });

  describe('componentDidMount', () => {
    it('calls getIdeas()', () => {
      const getIdeas = (wrapper.instance().getIdeas = jest.fn());

      wrapper.instance().componentDidMount();

      expect(getIdeas).toHaveBeenCalledTimes(1);
    });
  });

  describe('getIdeas', () => {
    it('calls dispatchGetIdeas(/api/v1/ideas/{id}) if props.id', () => {
      mockProps.id = 1;

      wrapper = shallow(<IdeaContainer {...mockProps} />, {
        disableLifecycleMethods: true
      });

      wrapper.instance().getIdeas();

      expect(mockProps.dispatchGetIdeas).toHaveBeenCalledTimes(1);
      expect(mockProps.dispatchGetIdeas).toHaveBeenCalledWith(
        `/api/v1/ideas/${mockProps.id}`
      );
    });

    it('calls dispatchGetIdeas(/api/v1/ideas) if no props.id', () => {
      mockProps.id = undefined;

      wrapper = shallow(<IdeaContainer {...mockProps} />, {
        disableLifecycleMethods: true
      });

      wrapper.instance().getIdeas();

      expect(mockProps.dispatchGetIdeas).toHaveBeenCalledTimes(1);
      expect(mockProps.dispatchGetIdeas).toHaveBeenCalledWith('/api/v1/ideas');
    });
  });

  describe('displayIdeaCards', () => {
    it('returns array with <IdeaCard> for each idea', () => {
      const ideaCards = wrapper.instance().displayIdeaCards();

      expect(Array(ideaCards)).toBeTruthy();
      expect(ideaCards).toHaveLength(2);
    });
  });

  describe('mapStateToProps', () => {
    it('parses state and maps to props', () => {
      const mockState = {
        isLoading: false,
        hasErrored: false,
        ideas: [{ id: 1, idea: 'mock idea' }]
      };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps.stateIsLoading).toEqual(mockState.isLoading);
      expect(mappedProps.stateHasErrored).toEqual(mockState.hasErrored);
      expect(mappedProps.stateIdeas).toEqual(mockState.ideas);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch on getIdeas(url)', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);

      const mockUrl = '/api/vi/mock';

      mappedProps.dispatchGetIdeas(mockUrl);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(thunk.getIdeas).toHaveBeenCalledTimes(1);
      expect(thunk.getIdeas).toHaveBeenCalledWith(mockUrl);
    });
  });
});
