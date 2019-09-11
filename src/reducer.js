import {
  SET_CHARACTERS,
  SET_FILTER,
  SET_LOADING,
  SET_MOVIES,
  SET_SORT_ORDER,
  SET_SELECTED_MOVIE_INDEX,
  SET_SORT_BY,
  RESET_FILTER,
  RESET_LOADING,
  RESET_STATE,
  APP_INITIAL_STATE,
} from './constants';

const AppReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.value, loadingText: action.text };
    case RESET_LOADING:
      return { ...state, loading: false, loadingText: null };
    case SET_MOVIES:
      return { ...state, movies: action.movies };
    case SET_CHARACTERS:
      return { ...state, characters: { ...state.characters, [action.movieId]: action.characters } };
    case SET_SELECTED_MOVIE_INDEX:
      return { ...state, selectedMovieIndex: action.value };
    case SET_FILTER:
      return { ...state, filter: action.filter };
    case RESET_FILTER:
      return { ...state, filter: APP_INITIAL_STATE.filter };
    case SET_SORT_BY:
      return { ...state, sortBy: action.value };
    case SET_SORT_ORDER:
      return { ...state, sortOrder: { ...action.sortOrder, [action.key]: action.value } };
    case RESET_STATE:
      return {
        ...state,
        sortOrder: APP_INITIAL_STATE.sortOrder,
        sortBy: APP_INITIAL_STATE.sortBy,
        loading: false,
        loadingText: null,
        filter: APP_INITIAL_STATE.filter,
        selectedMovieIndex: null,
      };
    default:
      return state;
  }
};

export default AppReducer;
