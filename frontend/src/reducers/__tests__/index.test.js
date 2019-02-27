import { createStore } from 'redux';
import rootReducer from '../';
import * as appReducer from '../appReducer';
import * as ideaReducer from '../ideaReducer';

const store = createStore(rootReducer);

describe('rootReducer', () => {
  it('checks that the intial state of the root reducer matches what the child reducer returns, given an empty action', () => {
    expect(store.getState().isLoading).toEqual(appReducer.isLoading(false, {}));
    expect(store.getState().hasErrored).toEqual(
      appReducer.hasErrored(false, {})
    );
    expect(store.getState().ideas).toEqual(ideaReducer.ideas([], {}));
  });

  it('returns initial state if passed in an action type of RESET_STORE', () => {
    const initialState = {
      isLoading: true,
      hasErrored: true,
      ideas: ['items']
    };
    const mockAction = {
      type: 'RESET_STORE'
    };

    const result = rootReducer(initialState, mockAction);

    const expected = {
      isLoading: false,
      hasErrored: false,
      ideas: []
    };

    expect(result).toEqual(expected);
  });
});
