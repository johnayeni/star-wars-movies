import {
  DESCENDING_ORDER, NUMBER, DATE, STRING,
} from './constants';

export function compareObjFn({
  currentObj, nextObj, key, type,
}) {
  let currentVal;
  let nextVal;
  if (currentObj[key] && nextObj[key]) {
    if (type === NUMBER) {
      currentVal = Number(currentObj[key]) || 0;
      nextVal = Number(nextObj[key]) || 0;
    } else if (type === DATE) {
      currentVal = new Date(currentObj[key]) || '';
      nextVal = new Date(nextObj[key]) || '';
    } else {
      currentVal = currentObj[key].toLowerCase();
      nextVal = nextObj[key].toLowerCase();
    }
    if (nextVal < currentVal) {
      return 1;
    } if (nextVal > currentVal) {
      return -1;
    }
  }
  return 0;
}

export function sortArrOfObj({
  arr, objectKey, sortOrder, keyType = STRING,
}) {
  const sortedArrInAsc = [...arr].sort((currentObj, nextObj) => compareObjFn({
    currentObj, nextObj, key: objectKey, type: keyType,
  }));
  if (sortOrder === DESCENDING_ORDER) {
    const sortedArrInDesc = [...sortedArrInAsc].reverse();
    return sortedArrInDesc;
  }
  return sortedArrInAsc;
}

export function sortMovies(movies) {
  return sortArrOfObj({
    arr: movies, objectKey: 'release_date', sortOrder: DESCENDING_ORDER, keyType: DATE,
  });
}

export function sortCharacters({
  characters, key, type, order,
}) {
  return sortArrOfObj({
    arr: characters, objectKey: key, sortOrder: order, keyType: type,
  });
}

export function isArrayAndHasContent(arr) {
  return Array.isArray(arr) && arr.length > 0;
}

export function getTotalHeightOfCharacters(characters) {
  return characters.reduce((total, character) => {
    const height = character.height === 'unknown' ? 0 : Number(character.height);
    return total + height;
  }, 0);
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
