import * as action from '../actions';
import * as api from '../api';

export const getIdeas = url => {
  return async dispatch => {
    try {
      dispatch(action.hasErrored(false));
      dispatch(action.isLoading(true));
      const ideas = await api.request(url);
      dispatch(action.setIdeas(ideas));
      dispatch(action.isLoading(false));
    } catch (error) {
      dispatch(action.isLoading(false));
      dispatch(action.hasErrored(true));
    }
  };
};
