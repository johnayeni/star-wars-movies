import React from 'react';
import { APP_INITIAL_STATE } from './constants';

const AppContext = React.createContext({
  ...APP_INITIAL_STATE,
  onfilterChange: () => {},
  onselectedMovieIdChange: () => {},
  toggleKeyOrder: () => {},
});

export default AppContext;
