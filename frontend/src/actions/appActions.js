export const resetStore = () => ({
  type: 'RESET_STORE'
});

export const isLoading = bool => ({
  type: 'IS_LOADING',
  bool
});

export const hasErrored = bool => ({
  type: 'HAS_ERRORED',
  bool
});
