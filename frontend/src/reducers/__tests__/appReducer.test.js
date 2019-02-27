import * as appReducer from '../appReducer';

describe('isLoading', () => {
  it('returns default state when no action passed', () => {
    expect(appReducer.isLoading(false, {})).toEqual(false);
  });

  it('returns boolean if passed in an action type of IS_LOADING', () => {
    const initialState = false;
    const mockAction = { type: 'IS_LOADING', bool: true };
    const result = appReducer.isLoading(initialState, mockAction);
    const expected = true;

    expect(result).toEqual(expected);
  });
});

describe('hasErrored', () => {
  it('returns default state when no action passed', () => {
    expect(appReducer.hasErrored(false, {})).toEqual(false);
  });

  it('returns boolean if passed in an action type of HAS_ERRORED', () => {
    const initialState = false;
    const mockAction = { type: 'HAS_ERRORED', bool: true };
    const result = appReducer.hasErrored(initialState, mockAction);
    const expected = true;

    expect(result).toEqual(expected);
  });
});
