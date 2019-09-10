/* eslint-disable no-undef */
import { useReducer } from 'react';

const useLocalStorage = (reducer, initialValue) => {
  const getLocalState = () => {
    try {
      const item = localStorage.getItem('state');
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const [state, setState] = useReducer(reducer, getLocalState());

  const dispatch = (...actions) => {
    actions.forEach(action => setState(action));
    localStorage.setItem('state', JSON.stringify(state));
  };

  return [state, dispatch];
};
export default useLocalStorage;
