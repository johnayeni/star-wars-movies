export const ASCENDING_ORDER = 'asc';
export const DESCENDING_ORDER = 'desc';
export const API_URL = 'https://swapi.co/api';
export const NUMBER = 'number';
export const DATE = 'date';
export const STRING = 'string';

export const APP_INITIAL_STATE = {
  loading: false,
  movieList: [],
  selectedMovieIndex: null,
  loadingText: '',
  filter: 'all',
  characterList: [],
  order: {
    name: DESCENDING_ORDER,
    gender: DESCENDING_ORDER,
    height: DESCENDING_ORDER,
  },
  sortBy: null,
};

export const SET_LOADING = 'SET_LOADING';
export const SET_MOVIE_LIST = 'SET_MOVIE_LIST';
export const SET_CHARACTER_LIST = 'SET_CHARACTER_LIST';
export const SET_SELECTED_MOVIE_ID = 'SET_SELECTED_MOVIE_ID';
export const SET_ORDER = 'SET_ORDER';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_FILTER = 'SET_FILTER';
