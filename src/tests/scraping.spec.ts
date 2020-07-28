import { findNewPost, NewPost } from './../scraping';

describe('findNewPost', () => {
  it('should parse a new post when present', () => {
    const testBody =
      'fsadfhlkasdhjglksadfghkljsdgvfjklanva 19m flaisufhdlsaf asldjfnlsdkafn';

    const result = findNewPost(testBody);
    const expected: NewPost = {
      minSince: '19m',
    };
    expect(result).toEqual(expected);
  });

  it('should return null when no new post', () => {
    const testBody =
      'fsadfhlkasdhjglks19madfghkljsdgvfjklanv flaisufhdlsaf asldjfnlsdkafn';

    const result = findNewPost(testBody);

    expect(result).toEqual(null);
  });
});
