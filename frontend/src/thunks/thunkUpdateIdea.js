import * as action from '../actions';
import * as api from '../api';

export const updateIdea = (ideaID, nextIdea, ideas) => {
  return async dispatch => {
    try {
      dispatch(action.hasErrored(false));
      await api.updateIdea(ideaID, nextIdea);
      const updatedIdeas = ideas.map(idea => {
        if (idea.id === ideaID) {
          return { ...idea, idea: nextIdea };
        } else {
          return idea;
        }
      });
      dispatch(action.setIdeas(updatedIdeas));
    } catch (error) {
      dispatch(action.hasErrored(true));
    }
  };
};
