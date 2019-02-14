import * as thunk from '../';
import * as action from '../../actions';
import * as api from '../../api';

jest.mock('../../api');

describe('deleteIdea', () => {
  let mockDispatch;
  let mockIdeaID;
  let mockIdeas;

  beforeEach(() => {
    jest.resetAllMocks();
    mockDispatch = jest.fn();
    mockIdeaID = 1;
    mockIdeas = [{ id: 1, idea: 'mock idea' }];
  });

  it('dispatches hasErrored(false)', async () => {
    const thunkDeleteIdea = thunk.deleteIdea(mockIdeaID, mockIdeas);

    await thunkDeleteIdea(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.hasErrored(false));
  });

  it('calls deleteIdea(ideaID)', async () => {
    const thunkDeleteIdea = thunk.deleteIdea(mockIdeaID, mockIdeas);

    await thunkDeleteIdea(mockDispatch);

    expect(api.deleteIdea).toHaveBeenCalledTimes(1);
    expect(api.deleteIdea).toHaveBeenCalledWith(mockIdeaID);
  });

  it('dispatches setIdeas(filteredIdeas)', async () => {
    const responseIdeaID = [{ id: 1 }];
    const mockFilteredIdeas = [];

    api.deleteIdea = jest
      .fn()
      .mockImplementation(() => Promise.resolve(responseIdeaID));

    const thunkDeleteIdea = thunk.deleteIdea(mockIdeaID, mockIdeas);

    await thunkDeleteIdea(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(
      action.setIdeas(mockFilteredIdeas)
    );
  });

  it('dispatches hasErrored(true) on error', async () => {
    api.deleteIdea = jest.fn().mockImplementation(() => Promise.reject());

    const thunkDeleteIdea = thunk.deleteIdea(mockIdeaID, mockIdeas);

    await thunkDeleteIdea(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.hasErrored(true));
  });
});
