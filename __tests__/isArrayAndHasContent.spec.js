const { isArrayAndHasContent } = require('../src/utils');

describe('Is Array And Array Has Content spec', () => {
  test('it should return false if its not an array', () => {
    expect(isArrayAndHasContent('hello')).toBe(false);
  });
  test('it should return false if the array length is less than 1', () => {
    expect(isArrayAndHasContent([])).toBe(false);
  });

  test('it should return true if it is an array an the length is greater than 1', () => {
    expect(isArrayAndHasContent([2, 3])).toBe(true);
  });
});
