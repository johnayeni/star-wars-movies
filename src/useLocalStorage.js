/* eslint-disable no-undef */
import { useReducer } from 'react';
import AppReducer from './reducer';

const useLocalStorage = (initialValue) => {
  const getLocalState = () => {
    try {
      const item = localStorage.getItem('state');
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      return initialValue;
    }
  };

  const [state, setState] = useReducer(AppReducer, getLocalState());

  const dispatch = (props) => {
    setState(props);
    localStorage.setItem('state', JSON.stringify(state));
  };

  return [state, dispatch];
};
export default useLocalStorage;
