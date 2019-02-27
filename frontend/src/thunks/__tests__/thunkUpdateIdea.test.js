import * as thunk from '../';
import * as action from '../../actions';
import * as api from '../../api';

jest.mock('../../api');

describe('updateIdea', () => {
  let mockDispatch;
  let mockIdeaID;
  let mockNextIdea;
  let mockIdeas;

  beforeEach(() => {
    jest.resetAllMocks();
    mockDispatch = jest.fn();
    mockIdeaID = 1;
    mockNextIdea = 'updated mock idea';
    mockIdeas = [{ id: 1, idea: 'mock idea' }];
  });

  it('dispatches hasErrored(false)', async () => {
    const thunkUpdateIdea = thunk.updateIdea(
      mockIdeaID,
      mockNextIdea,
      mockIdeas
    );

    await thunkUpdateIdea(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.hasErrored(false));
  });

  it('calls updateIdea(ideaID, nextIdea)', async () => {
    const thunkUpdateIdea = thunk.updateIdea(
      mockIdeaID,
      mockNextIdea,
      mockIdeas
    );

    await thunkUpdateIdea(mockDispatch);

    expect(api.updateIdea).toHaveBeenCalledTimes(1);
    expect(api.updateIdea).toHaveBeenCalledWith(mockIdeaID, mockNextIdea);
  });

  it('dispatches setIdeas(updatedIdeas) with updated idea if ideaID matches', async () => {
    const mockUpdatedIdeas = [{ id: 1, idea: mockNextIdea }];

    const thunkUpdateIdea = thunk.updateIdea(
      mockIdeaID,
      mockNextIdea,
      mockIdeas
    );

    await thunkUpdateIdea(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(
      action.setIdeas(mockUpdatedIdeas)
    );
  });

  it('dispatches setIdeas(updatedIdeas) with original idea if ideaID doesnt match', async () => {
    mockIdeaID = 2;

    const thunkUpdateIdea = thunk.updateIdea(
      mockIdeaID,
      mockNextIdea,
      mockIdeas
    );

    await thunkUpdateIdea(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.setIdeas(mockIdeas));
  });

  it('dispatches hasErrored(true) on error', async () => {
    api.updateIdea = jest.fn().mockImplementation(() => Promise.reject());

    const thunkUpdateIdea = thunk.updateIdea(
      mockIdeaID,
      mockNextIdea,
      mockIdeas
    );

    await thunkUpdateIdea(mockDispatch);

    expect(mockDispatch).toHaveBeenCalledWith(action.hasErrored(true));
  });
});
