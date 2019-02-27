export const ideas = (state = [], action) => {
  switch (action.type) {
    case 'SET_IDEA':
      return [...state, action.idea];
    case 'SET_IDEAS':
      return action.ideas;
    default:
      return state;
  }
};
