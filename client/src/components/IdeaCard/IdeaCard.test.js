import React from 'react';
import { shallow } from 'enzyme';
import { IdeaCard, mapStateToProps, mapDispatchToProps } from './IdeaCard';
import * as thunk from '../../thunks';
jest.mock('../../thunks');

describe('IdeaCard', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {
      id: 1,
      idea: 'If you dig it, do it. If you dig it a lot, do it twice.',
      stateIdeas: [{ id: 1, idea: 'mock idea' }],
      created_at: '2018-11-26T23:48:35.890Z',
      updated_at: '2018-11-26T23:48:35.890Z',
      dispatchAddIdea: jest.fn(),
      dispatchDeleteIdea: jest.fn(),
      dispatchUpdateIdea: jest.fn()
    };

    wrapper = shallow(<IdeaCard {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  describe('handleInputIdeaCard', () => {
    it('sets state.nextIdea with innerText', () => {
      const event = { target: { innerText: 'mock innerText' } };

      expect(wrapper.state().nextIdea).toEqual(mockProps.idea);

      wrapper.instance().handleInputIdeaCard(event);

      expect(wrapper.state().nextIdea).toEqual('mock innerText');
    });

    it('calls dispatchUpdateIdea(ideaID, nextIdea, ideas)', () => {
      const event = { target: { innerText: 'mock innerText' } };

      wrapper.instance().handleInputIdeaCard(event);

      expect(mockProps.dispatchUpdateIdea).toHaveBeenCalledTimes(1);
      expect(mockProps.dispatchUpdateIdea).toHaveBeenCalledWith(
        mockProps.id,
        wrapper.state().nextIdea,
        mockProps.stateIdeas
      );
    });
  });

  describe('handleClickDeleteBtn', () => {
    it('disables delete button', () => {
      const event = { target: { disabled: false } };

      expect(event.target.disabled).toBe(false);

      wrapper.instance().handleClickDeleteBtn(event);

      expect(event.target.disabled).toBe(true);
    });

    it('calls dispatchDeleteIdea(ideaID, ideas)', () => {
      const event = { target: { disabled: false } };

      wrapper.instance().handleClickDeleteBtn(event);

      expect(mockProps.dispatchDeleteIdea).toHaveBeenCalledTimes(1);
      expect(mockProps.dispatchDeleteIdea).toHaveBeenCalledWith(
        mockProps.id,
        mockProps.stateIdeas
      );
    });
  });

  describe('event handlers', () => {
    it('calls handleClickDeleteBtn(event) on deleteBtn click', () => {
      const event = {};
      const handleClickDeleteBtn = (wrapper.instance().handleClickDeleteBtn = jest.fn());

      wrapper.find('.deleteBtn').simulate('click', event);

      expect(handleClickDeleteBtn).toHaveBeenCalledTimes(1);
      expect(handleClickDeleteBtn).toHaveBeenCalledWith(event);
    });

    it('calls handleInputIdeaCard(event) on ideaCardText input', () => {
      const event = {};
      const handleInputIdeaCard = (wrapper.instance().handleInputIdeaCard = jest.fn());

      wrapper.find('.ideaCardText').simulate('input', event);

      expect(handleInputIdeaCard).toHaveBeenCalledTimes(1);
      expect(handleInputIdeaCard).toHaveBeenCalledWith(event);
    });
  });

  describe('mapStateToProps', () => {
    it('parses state and maps to props', () => {
      const mockState = { ideas: [{ id: 1, idea: 'mock idea' }] };

      const mappedProps = mapStateToProps(mockState);

      expect(mappedProps.stateIdeas).toEqual(mockState.ideas);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch on updateIdea(ideaID, nextIdea, ideas)', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);

      const mockIdeaID = mockProps.id;
      const mockNextIdea = wrapper.state().nextIdea;
      const mockIdeas = mockProps.stateIdeas;

      // const thunkUpdateIdea = thunk.updateIdea(
      //   mockIdeaID,
      //   mockNextIdea,
      //   mockIdeas
      // );

      mappedProps.dispatchUpdateIdea(mockIdeaID, mockNextIdea, mockIdeas);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      // expect(mockDispatch).toHaveBeenCalledWith(thunkUpdateIdea);
      expect(thunk.updateIdea).toHaveBeenCalledTimes(1);
      expect(thunk.updateIdea).toHaveBeenCalledWith(
        mockProps.id,
        wrapper.state().nextIdea,
        mockProps.stateIdeas
      );
    });

    it('calls dispatch on deleteIdea(ideaID, ideas)', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);

      const mockIdeaID = mockProps.id;
      const mockIdeas = mockProps.stateIdeas;

      mappedProps.dispatchDeleteIdea(mockIdeaID, mockIdeas);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(thunk.deleteIdea).toHaveBeenCalledTimes(1);
      expect(thunk.deleteIdea).toHaveBeenCalledWith(
        mockProps.id,
        mockProps.stateIdeas
      );
    });
  });
});
