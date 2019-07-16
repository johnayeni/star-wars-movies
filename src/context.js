import React from 'react';

const AppContext = React.createContext({
  loading: false,
  movieList: [],
  selectedMovieId: null,
  loadingText: '',
  filter: '',
  characterListOrder: {
    name: '',
    gender: '',
    height: '',
  },
  onfilterChange: () => {},
  onselectedMovieIdChange: () => {},
  sortCharactersBy: () => {},
});

export default AppContext;
