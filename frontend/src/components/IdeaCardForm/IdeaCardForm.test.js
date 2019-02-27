import React from 'react';
import { shallow } from 'enzyme';
import { IdeaCardForm, mapDispatchToProps } from './IdeaCardForm';
import * as thunk from '../../thunks';
jest.mock('../../thunks');

describe('IdeaCardForm', () => {
  let wrapper;
  let mockProps;

  beforeEach(() => {
    jest.resetAllMocks();
    mockProps = {
      dispatchAddIdea: jest.fn()
    };

    wrapper = shallow(<IdeaCardForm {...mockProps} />, {
      disableLifecycleMethods: true
    });
  });

  it('matches the snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with idea', () => {
    wrapper.setState({ idea: 'mock idea' });

    expect(wrapper).toMatchSnapshot();
  });

  it('matches the snapshot with isSubmitDisabled: false', () => {
    wrapper.setState({ isSubmitDisabled: false });

    expect(wrapper).toMatchSnapshot();
  });

  describe('canSubmit', () => {
    it('sets state.isSubmitDisabled: true if input is empty', () => {
      wrapper.setState({ idea: '', isSubmitDisabled: false });

      wrapper.instance().canSubmit();

      expect(wrapper.state().isSubmitDisabled).toBe(true);
    });

    it('sets state.isSubmitDisabled: false if input isnt empty', () => {
      wrapper.setState({ idea: 'mock idea', isSubmitDisabled: true });

      wrapper.instance().canSubmit();

      expect(wrapper.state().isSubmitDisabled).toBe(false);
    });
  });

  describe('handleChangeIdeaInput', () => {
    it('sets state with tag name and value', () => {
      const event = { target: { name: 'idea', value: 'mock idea' } };

      expect(wrapper.state().idea).toEqual('');

      wrapper.instance().handleChangeIdeaInput(event);

      expect(wrapper.state().idea).toEqual('mock idea');
    });

    it('calls canSubmit', () => {
      const event = { target: { name: 'idea', value: 'mock idea' } };
      const canSubmit = (wrapper.instance().canSubmit = jest.fn());

      wrapper.instance().handleChangeIdeaInput(event);

      expect(canSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('handleSubmitIdeaForm', () => {
    it('calls preventDefault', async () => {
      const event = { preventDefault: jest.fn() };

      await wrapper.instance().handleSubmitIdeaForm(event);

      expect(event.preventDefault).toHaveBeenCalledTimes(1);
    });

    it('sets state.isSubmitDisabled: true', async () => {
      const event = { preventDefault: jest.fn() };
      wrapper.setState({ isSubmitDisabled: false });

      expect(wrapper.state().isSubmitDisabled).toBe(false);

      await wrapper.instance().handleSubmitIdeaForm(event);

      expect(wrapper.state().isSubmitDisabled).toBe(true);
    });

    it('calls dispatchAddIdea(this.state.idea)', async () => {
      const event = { preventDefault: jest.fn() };

      await wrapper.instance().handleSubmitIdeaForm(event);

      expect(mockProps.dispatchAddIdea).toHaveBeenCalledTimes(1);
    });

    it('sets state.idea to empty string', async () => {
      const event = { preventDefault: jest.fn() };
      wrapper.setState({ idea: 'mock idea' });

      expect(wrapper.state().idea).toEqual('mock idea');

      await wrapper.instance().handleSubmitIdeaForm(event);

      expect(wrapper.state().idea).toEqual('');
    });

    it('calls canSubmit', async () => {
      const event = { preventDefault: jest.fn() };
      const canSubmit = (wrapper.instance().canSubmit = jest.fn());

      await wrapper.instance().handleSubmitIdeaForm(event);

      expect(canSubmit).toHaveBeenCalledTimes(1);
    });
  });

  describe('event handlers', () => {
    it('calls handleSubmitIdeaForm(event) on IdeaCardForm submit', () => {
      const event = {};
      const handleSubmitIdeaForm = (wrapper.instance().handleSubmitIdeaForm = jest.fn());

      wrapper.find('.IdeaCardForm').simulate('submit', event);

      expect(handleSubmitIdeaForm).toHaveBeenCalledTimes(1);
      expect(handleSubmitIdeaForm).toHaveBeenCalledWith(event);
    });

    it('calls handleChangeIdeaInput(event) on IdeaCardInput change', () => {
      const event = {};
      const handleChangeIdeaInput = (wrapper.instance().handleChangeIdeaInput = jest.fn());

      wrapper.find('.IdeaCardInput').simulate('change', event);

      expect(handleChangeIdeaInput).toHaveBeenCalledTimes(1);
      expect(handleChangeIdeaInput).toHaveBeenCalledWith(event);
    });
  });

  describe('mapDispatchToProps', () => {
    it('calls dispatch on addIdea(idea)', () => {
      const mockDispatch = jest.fn();
      const mappedProps = mapDispatchToProps(mockDispatch);

      const mockIdea = { idea: 'mock idea' };

      mappedProps.dispatchAddIdea(mockIdea);

      expect(mockDispatch).toHaveBeenCalledTimes(1);
      expect(thunk.addIdea).toHaveBeenCalledTimes(1);
      expect(thunk.addIdea).toHaveBeenCalledWith(mockIdea);
    });
  });
});
