import { combineReducers } from 'redux';
import { isLoading, hasErrored } from './appReducer';
import { ideas } from './ideaReducer';

const allReducers = combineReducers({
  isLoading,
  hasErrored,
  ideas
});

const rootReducer = (state, action) => {
  if (action.type === 'RESET_STORE') {
    state = undefined;
  }
  return allReducers(state, action);
};

export default rootReducer;
