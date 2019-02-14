import * as preloadedState from '../preloadedState';

describe('preloadedState', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe.skip('description', () => {
    it('returns parsed items from localStorage.state', () => {
      localStorage.setItem('state', JSON.stringify({ mockState: {} }));

      expect();
    });

    it('returns undefined if localStorage.state is null', () => {
      // localStorage.setItem('state', 'mock items');

      console.log(localStorage);

      expect(localStorage.getItem).toHaveBeenCalledTimes(1);
    });
  });
});
