import React from 'react';

const AppContext = React.createContext({
  loading: false,
  movieList: [],
  selectedMovie: null,
  loadingText: '',
  filter: '',
  characterListOrder: {
    name: '',
    gender: '',
    height: '',
  },
  onfilterChange: () => {},
  onSelectedMovieChange: () => {},
  sortCharactersBy: () => {},
});

export default AppContext;
