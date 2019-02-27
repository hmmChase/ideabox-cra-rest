import * as thunk from '../';
import * as action from '../../actions';
import * as api from '../../api';

jest.mock('../../api');

describe('addIdea', () => {
  let mockDispatch;
  let mockIdea;

  beforeEach(() => {
    jest.resetAllMocks();
    mockDispatch = jest.fn();
    mockIdea = { idea: 'mock idea' };
  });

  it('dispatches hasErrored(false)', async () => {
    const thunkaddIdea = thunk.addIdea(mockIdea);

    await thunkaddIdea(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.hasErrored(false));
  });

  it('calls postIdea(idea)', async () => {
    const thunkaddIdea = thunk.addIdea(mockIdea);

    await thunkaddIdea(mockDispatch);

    expect(api.postIdea).toHaveBeenCalledTimes(1);
    expect(api.postIdea).toHaveBeenCalledWith(mockIdea);
  });

  it('dispatches setIdea(responseIdea)', async () => {
    const responseIdea = [{ id: 1, ...mockIdea }];

    api.postIdea = jest
      .fn()
      .mockImplementation(() => Promise.resolve(responseIdea));

    const thunkaddIdea = thunk.addIdea(mockIdea);

    await thunkaddIdea(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.setIdea(responseIdea));
  });

  it('dispatches hasErrored(true) on error', async () => {
    api.postIdea = jest.fn().mockImplementation(() => Promise.reject());

    const thunkaddIdea = thunk.addIdea(mockIdea);

    await thunkaddIdea(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.hasErrored(true));
  });
});
