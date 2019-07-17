import React from 'react';

const AppContext = React.createContext({
  loading: false,
  movieList: [],
  selectedMovieId: null,
  loadingText: '',
  filter: '',
  characters: {
    list: [],
    genders: [],
    order: {
      name: '',
      gender: '',
      height: '',
    },
  },
  onfilterChange: () => {},
  onselectedMovieIdChange: () => {},
  sortCharacters: () => {},
});

export default AppContext;
