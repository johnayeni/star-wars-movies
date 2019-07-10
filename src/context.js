import React from 'react';

const AppContext = React.createContext({
  loading: false,
  movieList: [],
  selectedMovie: null,
  loadingText: null,
});

export default AppContext;
