/* eslint-disable no-undef */
import { useReducer } from 'react';

const useSessionStorage = (reducer, initialValue) => {
  const getLocalState = () => {
    try {
      const item = sessionStorage.getItem('state');
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const [state, setState] = useReducer(reducer, getLocalState());

  const dispatch = (...actions) => {
    actions.forEach(action => setState(action));
    sessionStorage.setItem('state', JSON.stringify(state));
  };

  return [state, dispatch];
};
export default useSessionStorage;
