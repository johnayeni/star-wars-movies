export const ASCENDING_ORDER = 'asc';
export const DESCENDING_ORDER = 'desc';
export const API_URL = 'https://swapi.co/api';
export const NUMBER = 'number';
export const DATE = 'date';
export const STRING = 'string';

export const APP_INITIAL_STATE = {
  loading: false,
  movies: [],
  selectedMovieIndex: null,
  loadingText: '',
  filter: 'all',
  characters: [],
  sortOrder: {
    name: '',
    gender: '',
    height: '',
  },
  sortBy: null,
  errorMsg: null,
};

export const SET_LOADING = 'SET_LOADING';
export const SET_MOVIES = 'SET_MOVIES';
export const SET_CHARACTERS = 'SET_CHARACTERS';
export const SET_SELECTED_MOVIE_INDEX = 'SET_SELECTED_MOVIE_INDEX';
export const SET_SORT_ORDER = 'SET_SORT_ORDER';
export const SET_SORT_BY = 'SET_SORT_BY';
export const SET_FILTER = 'SET_FILTER';
export const SET_ERROR_MSG = 'SET_ERROR_MSG';
