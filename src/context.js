import React from 'react';
import { APP_INITIAL_STATE } from './constants';

const AppContext = React.createContext({
  ...APP_INITIAL_STATE,
  onfilterChange: () => {},
  onselectedMovieIndexChange: () => {},
  toggleKeyOrder: () => {},
});

export default AppContext;
