/* eslint-disable no-undef */
import {
  ASCENDING_ORDER, NUMBER, DATE, STRING,
} from './constants';

/**
 * This function is a sort comparator for objects in an array.
 * It compares two values and returns a numerical
 * @param {Object} {}
 */
export function compareObjFn({
  currentObj, nextObj, key, sortOrder, type = STRING,
}) {
  let comparison = 0;
  if (!(currentObj && nextObj && key && sortOrder && type)) {
    return comparison;
  }
  let currentVal;
  let nextVal;
  if (type === NUMBER) {
    currentVal = Number(currentObj[key]) || 0;
    nextVal = Number(nextObj[key]) || 0;
  } else if (type === DATE) {
    currentVal = new Date(currentObj[key]);
    nextVal = new Date(nextObj[key]);
  } else {
    currentVal = currentObj[key].toLowerCase();
    nextVal = nextObj[key].toLowerCase();
  }
  if (nextVal < currentVal) {
    comparison = 1;
  } else if (nextVal > currentVal) {
    comparison = -1;
  }
  return sortOrder === ASCENDING_ORDER ? comparison * -1 : comparison;
}

/**
 * Checks if a paramenter is an array and if the length is graeter than 0
 * @param {*} arr
 */
export function isArrayAndHasContent(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

/**
 * This function is for a reducer function to sum the height value of an
 * array of objects
 * @param {Number} total
 * @param {Object} character
 */
export function getTotalHeightReducer(total, character) {
  const height = character.height === 'unknown' ? 0 : Number(character.height);
  return total + height;
}

/**
 * Converts a number in centimetre value to feet/inches
 * @param {Number} cm
 */
export function convertCentimetresToFeetPerInches(cm) {
  if (typeof cm !== 'number') return null;
  const realFeet = (cm * 0.3937) / 12;
  const feet = Math.floor(realFeet);
  const inches = Math.round((realFeet - feet) * 12);
  return { feet, inches };
}
/**
 * Returns an array of unique gender value form the
 * characters passed in as an array
 * @param {Array} characters
 */
export function getUniqueGenders(characters = []) {
  return Array.from(new Set(characters.map(character => character.gender)));
}

export function runFnAndHandleError(fn, ...args) {
  try {
    fn(...args);
  } catch (error) {
    globalThis.window.alert(error.message);
  }
}
