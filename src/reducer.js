import {
  SET_CHARACTERS,
  SET_FILTER,
  SET_LOADING,
  SET_MOVIES,
  SET_SORT_ORDER,
  SET_SELECTED_MOVIE_INDEX,
  SET_SORT_BY,
  SET_ERROR_MSG,
} from './constants';

const AppReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return { ...state, loading: action.value, loadingText: action.text };
    case SET_MOVIES:
      return { ...state, movies: action.movies };
    case SET_CHARACTERS:
      return { ...state, characters: action.characters };
    case SET_SELECTED_MOVIE_INDEX:
      return { ...state, selectedMovieIndex: action.value };
    case SET_FILTER:
      return { ...state, filter: action.filter };
    case SET_SORT_BY:
      return { ...state, sortBy: action.value };
    case SET_SORT_ORDER:
      return { ...state, sortOrder: { ...action.sortOrder, [action.key]: action.value } };
    case SET_ERROR_MSG:
      return { ...state, errorMsg: action.msg };
    default:
      return state;
  }
};

export default AppReducer;
