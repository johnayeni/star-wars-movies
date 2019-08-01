const { getCharacterIdFromURL } = require('../src/utils');

describe('get charcter Id from url spec', () => {
  test('it should return a number if the url includes the ID', () => {
    expect(getCharacterIdFromURL('https://swapi.co/api/people/1/')).toBe(1);
  });
  test('it should return null if there is no ID', () => {
    expect(getCharacterIdFromURL('https://swapi.co/api/people/')).toBe(null);
  });
  test('it should return null if the parameter is not a string', () => {
    expect(getCharacterIdFromURL([])).toBe(null);
  });
});
