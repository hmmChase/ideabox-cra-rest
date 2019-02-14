import * as action from '../actions';
import * as api from '../api';

export const addIdea = idea => async dispatch => {
  try {
    dispatch(action.hasErrored(false));
    const responseIdea = await api.postIdea(idea);
    dispatch(action.setIdea(responseIdea));
  } catch (error) {
    dispatch(action.hasErrored(true));
  }
};
