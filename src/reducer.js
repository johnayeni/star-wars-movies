import {
  SET_CHARACTER_LIST,
  SET_FILTER,
  SET_LOADING,
  SET_MOVIE_LIST,
  SET_ORDER,
  SET_SELECTED_MOVIE_ID,
  SET_SORT_BY,
} from './constants';

const AppReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.value, loadingText: action.text };
    case SET_MOVIE_LIST:
      return { ...state, movieList: action.data };
    case SET_CHARACTER_LIST:
      return { ...state, characterList: action.data };
    case SET_SELECTED_MOVIE_ID:
      return { ...state, selectedMovieIndex: action.value };
    case SET_FILTER:
      return { ...state, filter: action.filter };
    case SET_SORT_BY:
      return { ...state, sortBy: action.value };
    case SET_ORDER:
      return { ...state, order: { ...action.order, [action.key]: action.value } };
    default:
      return { ...state };
  }
};

export default AppReducer;
