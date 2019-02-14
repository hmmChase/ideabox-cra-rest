import * as action from '../index';

describe('ideaActions', () => {
  it('has a type of SET_IDEA', () => {
    const idea = { idea: 'mock idea' };
    const actual = action.setIdea(idea);

    expect(actual).toEqual({
      type: 'SET_IDEA',
      idea
    });
  });

  it('has a type of SET_IDEAS', () => {
    const ideas = [{ idea: 'mock idea' }];
    const actual = action.setIdeas(ideas);

    expect(actual).toEqual({
      type: 'SET_IDEAS',
      ideas
    });
  });
});
