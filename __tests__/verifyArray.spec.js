const { verifyArray } = require('../src/utils');

describe('verify array spec', () => {
  test('it should return false if its not an array', () => {
    expect(verifyArray('hello')).toBe(false);
  });
  test('it should return false if the array length is less than 1', () => {
    expect(verifyArray([])).toBe(false);
  });

  test('it should return true if it is an array an the length is greater than 1', () => {
    expect(verifyArray([2, 3])).toBe(true);
  });
});
