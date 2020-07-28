import { matchStore, getPostTime } from './../matchStore';

describe('matchStore stuff', () => {
  it('gets stuff', () => {
    const result = matchStore['testKey'];
    expect(result).toBe(true);
  });

  it('gets stuff', () => {
    const result = matchStore['nonexistantkey'];
    expect(result).toBeNull;
  });
});

describe('getPostTime stuff', () => {
  it('works', () => {
    const now = new Date(2020, 1, 1, 10, 10).valueOf();
    const fiveAgo = new Date(2020, 1, 1, 10, 5).valueOf();
    const mins = 5;
    const result = getPostTime(now, mins);
    expect(result).toEqual(fiveAgo);
  });
});
