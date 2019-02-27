import * as action from '../index';

describe('appActions', () => {
  it('has a type of RESET_STORE', () => {
    const actual = action.resetStore();

    expect(actual).toEqual({
      type: 'RESET_STORE'
    });
  });

  it('has a type of IS_LOADING', () => {
    const bool = true;
    const actual = action.isLoading(bool);

    expect(actual).toEqual({
      type: 'IS_LOADING',
      bool
    });
  });

  it('has a type of HAS_ERRORED', () => {
    const bool = true;
    const actual = action.hasErrored(bool);

    expect(actual).toEqual({
      type: 'HAS_ERRORED',
      bool
    });
  });
});
