import * as thunk from '../';
import * as action from '../../actions';
import * as api from '../../api';

jest.mock('../../api');

describe('getIdeas', () => {
  let mockDispatch;
  let mockUrl;

  beforeEach(() => {
    jest.resetAllMocks();
    mockDispatch = jest.fn();
    mockUrl = 'www.mockUrl.com';
  });

  it('dispatches hasErrored(false)', async () => {
    const thunkGetIdeas = thunk.getIdeas(mockUrl);

    await thunkGetIdeas(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.hasErrored(false));
  });

  it('dispatches isLoading(true)', async () => {
    const thunkGetIdeas = thunk.getIdeas(mockUrl);

    await thunkGetIdeas(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.isLoading(true));
  });

  it('calls request(url)', async () => {
    const thunkGetIdeas = thunk.getIdeas(mockUrl);

    await thunkGetIdeas(mockDispatch);

    expect(api.request).toHaveBeenCalledTimes(1);
    expect(api.request).toHaveBeenCalledWith(mockUrl);
  });

  it('dispatches setIdeas(ideas)', async () => {
    const responseIdeas = [{ id: 1, idea: 'mock idea' }];

    api.request = jest
      .fn()
      .mockImplementation(() => Promise.resolve(responseIdeas));

    const thunkGetIdeas = thunk.getIdeas(mockUrl);

    await thunkGetIdeas(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.setIdeas(responseIdeas));
  });

  it('dispatches isLoading(false) on error', async () => {
    api.request = jest.fn().mockImplementation(() => Promise.reject());

    const thunkGetIdeas = thunk.getIdeas(mockUrl);

    await thunkGetIdeas(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.isLoading(false));
  });

  it('dispatches hasErrored(true) on error', async () => {
    api.request = jest.fn().mockImplementation(() => Promise.reject());

    const thunkGetIdeas = thunk.getIdeas(mockUrl);

    await thunkGetIdeas(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.hasErrored(true));
  });
});
