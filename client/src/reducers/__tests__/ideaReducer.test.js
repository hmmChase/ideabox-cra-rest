import * as ideaReducer from '../ideaReducer';

describe('ideas', () => {
  it('returns default state when no action passed', () => {
    expect(ideaReducer.ideas([], {})).toEqual([]);
  });

  it('returns updated ideas if passed in an action type of SET_IDEA', () => {
    const initialState = [];
    const mockAction = {
      type: 'SET_IDEA',
      idea: { id: 1, idea: 'updated mock idea' }
    };
    const result = ideaReducer.ideas(initialState, mockAction);
    const expected = [{ id: 1, idea: 'updated mock idea' }];

    expect(result).toEqual(expected);
  });

  it('returns ideas if passed in an action type of SET_IDEAS', () => {
    const initialState = [];
    const mockAction = {
      type: 'SET_IDEAS',
      ideas: [{ id: 1, idea: 'mock idea' }]
    };
    const result = ideaReducer.ideas(initialState, mockAction);
    const expected = [{ id: 1, idea: 'mock idea' }];

    expect(result).toEqual(expected);
  });
});
