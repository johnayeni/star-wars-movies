import { ASCENDING_ORDER } from './constants';

export const sort = (a, b, key, order, type) => {
  let comparison = 0;

  const A = type === 'number' ? Number(a[key]) : a[key].toUpperCase();
  const B = type === 'number' ? Number(b[key]) : b[key].toUpperCase();

  if (A < B) {
    comparison = 1;
  } else if (A > B) {
    comparison = -1;
  }
  return order === ASCENDING_ORDER ? comparison : comparison * -1;
};

export const determineGender = (value) => {
  const genders = { hermaphrodite: 'H', male: 'M', female: 'F' };
  return genders[value.toLowerCase()] || 'N/A';
};

export const verifyArray = arr => Array.isArray(arr) && arr.length > 0;
