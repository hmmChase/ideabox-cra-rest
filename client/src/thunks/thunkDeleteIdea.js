import * as action from '../actions';
import * as api from '../api';

export const deleteIdea = (ideaID, ideas) => {
  return async dispatch => {
    try {
      dispatch(action.hasErrored(false));
      await api.deleteIdea(ideaID);
      const filteredIdeas = ideas.filter(idea => {
        return idea.id !== ideaID;
      });
      dispatch(action.setIdeas(filteredIdeas));
    } catch (error) {
      dispatch(action.hasErrored(true));
    }
  };
};
