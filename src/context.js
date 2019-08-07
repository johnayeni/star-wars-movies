import React from 'react';
import { APP_INITIAL_STATE } from './constants';

const AppContext = React.createContext({
  ...APP_INITIAL_STATE,
  onfilterChange: () => {},
  onSelectedMovieIndexChange: () => {},
  toggleKeyOrder: () => {},
});

export default AppContext;
