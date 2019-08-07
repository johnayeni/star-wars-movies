import { ASCENDING_ORDER, NUMBER, DATE } from './constants';

/**
 * This function is a sort comparator for objects in an array.
 * It compares two values and determines if thier order should be swapped
 *  depending and the order of the sorting
 * @param {*} a
 * @param {*} b
 * @param {String} key
 * @param {String} sortOrder
 * @param {String} type
 */
export const sortComparator = (a, b, key, sortOrder, type) => {
  let comparison = 0;
  let A;
  let B;
  if (type === NUMBER) {
    A = Number(a[key]) || 0;
    B = Number(b[key]) || 0;
  } else if (type === DATE) {
    A = new Date(a[key]);
    B = new Date(b[key]);
  } else {
    A = a[key].toLowerCase();
    B = b[key].toLowerCase();
  }
  if (A < B) {
    comparison = 1;
  } else if (A > B) {
    comparison = -1;
  }
  return sortOrder === ASCENDING_ORDER ? comparison * -1 : comparison;
};

/**
 * This funcction is to sort a list of characters based on a particular
 * key and sortOrder
 * @param {Array} characters
 * @param {String} key
 * @param {String} sortOrder
 * @param {String} type
 */
export const sortCharacters = (characters, key, sortOrder, type) => characters.sort((a, b) => sortComparator(a, b, key, sortOrder, type));

/**
 * Checks if a paramenter is an array and if the length is graeter than 0
 * @param {*} arr
 */
export const isArrayAndHasContent = arr => Array.isArray(arr) && arr.length > 0;

/**
 * This function is for a reducer function to sum the height value of an
 * array of objects
 * @param {Number} total
 * @param {Object} character
 */
export const getTotalHeight = (total, character) => {
  const height = character.height === 'unknown' ? 0 : Number(character.height);
  return total + height;
};

/**
 * Converts a number in centimetre value to feet/inches
 * @param {Number} cm
 */
export const convertCentimetresToFeetPerInches = (cm) => {
  if (typeof cm !== 'number') return null;
  const realFeet = (cm * 0.3937) / 12;
  const feet = Math.floor(realFeet);
  const inches = Math.round((realFeet - feet) * 12);
  return { feet, inches };
};
/**
 * This function extracts a charcter's id from its url
 * @param {*} url
 */
export const getCharacterIdFromURL = (url) => {
  let id = null;
  if (typeof url === 'string') id = Number.parseInt(url.replace(/^\D+/g, ''), 10);
  return isNaN(id) ? null : id;
};
/**
 * Returns an array of unique gender value form the
 * characters passed in as an array
 * @param {Array} characters
 */
export const getUniqueGenders = characters => Array.from(new Set(characters.map(character => character.gender)));

/**
 * This function is for handling errors
 * @param {String} message
 */
