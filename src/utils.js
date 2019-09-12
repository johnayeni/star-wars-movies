/* eslint-disable no-undef */
import {
  ASCENDING_ORDER, NUMBER, DATE, STRING,
} from './constants';

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

export function isArrayAndHasContent(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

export function getTotalHeightReducer(total, character) {
  const height = character.height === 'unknown' ? 0 : Number(character.height);
  return total + height;
}

export function convertCentimetresToFeetPerInches(cm) {
  if (typeof cm !== 'number') return null;
  const realFeet = (cm * 0.3937) / 12;
  const feet = Math.floor(realFeet);
  const inches = Math.round((realFeet - feet) * 12);
  return `${feet} ft, ${inches}inch`;
}

export function getUniqueGenders(characters = []) {
  return Array.from(new Set(characters.map(character => character.gender)));
}

export function returnSafeFn(fn, ...args) {
  return function safeFn() {
    try {
      fn(...args);
    } catch (error) {
      globalThis.window.alert(error.message);
    }
  };
}
