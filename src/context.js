import React from 'react';

const AppContext = React.createContext({
  loading: false,
  movieList: [],
  selectedMovieId: null,
  loadingText: '',
  filter: '',
  characterList: [],
  genders: [],
  order: {
    name: '',
    gender: '',
    height: '',
  },
  sortBy: null,
  onfilterChange: () => {},
  onselectedMovieIdChange: () => {},
  toggleKeyOrder: () => {},
});

export default AppContext;
