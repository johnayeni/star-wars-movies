const { convertCentimetresToFeetPerInches } = require('../src/utils');

describe('convert centimeters to feet per inches spec', () => {
  test('should return null if the parameter is not a number', () => {
    expect(convertCentimetresToFeetPerInches('2')).toBe(null);
    expect(convertCentimetresToFeetPerInches([2])).toBe(null);
    expect(convertCentimetresToFeetPerInches(true)).toBe(null);
  });
  test('should return the feet and inches of a value in cm as an object', () => {
    expect(convertCentimetresToFeetPerInches(195.58)).toEqual({ feet: 6, inches: 5 });
    expect(convertCentimetresToFeetPerInches(182.88)).toEqual({ feet: 5, inches: 12 });
  });
});
