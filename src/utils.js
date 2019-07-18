import { toast } from 'react-toastify';
import { ASCENDING_ORDER, NUMBER, DATE } from './constants';

/**
 * This function is a sort function for  objects in an array.
 * It compares two values and determines if thier order should be swapped
 *  depending and the order of the sorting
 * @param {*} a
 * @param {*} b
 * @param {String} key
 * @param {String} order
 * @param {String} type
 */
export const sortHelper = (a, b, key, order, type) => {
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
    A = a[key].toUpperCase();
    B = b[key].toUpperCase();
  }

  if (A < B) {
    comparison = 1;
  } else if (A > B) {
    comparison = -1;
  }
  return order === ASCENDING_ORDER ? comparison * -1 : comparison;
};

/**
 * This funcction is to sort a list of characters based on a particular
 * key and order
 * @param {Array} characters
 * @param {String} key
 * @param {String} order
 * @param {String} type
 */
export const sortCharacters = (characters, key, order, type) => characters.sort((a, b) => sortHelper(a, b, key, order, type));

/**
 * Checks if a paramenter is an array and if the length is graeter than 0
 * @param {*} arr
 */
export const verifyArray = arr => Array.isArray(arr) && arr.length > 0;

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
  const realFeet = (cm * 0.3937) / 12;
  const feet = Math.floor(realFeet);
  const inches = Math.round((realFeet - feet) * 12);
  return { feet, inches };
};
/**
 * This function extracts a charcter's id from its url
 * @param {*} url
 */
export const getCharacterIdFromURL = url => Number.parseInt(url.replace(/^\D+/g, ''), 10);

/**
 * This function is for handling errors
 * @param {String} message
 */
export const handleError = (message) => {
  toast.error(message || 'An error has occured');
  console.log(message);
};
