import React, { useEffect, useReducer } from 'react';
import AppContext from 'context';
import * as API from 'api';
import AppReducer from 'reducer';
import {
  APP_INITIAL_STATE,
  SET_CHARACTER_LIST,
  SET_FILTER,
  SET_GENDERS,
  SET_LOADING,
  SET_MOVIE_LIST,
  SET_ORDER,
  SET_SELECTED_MOVIE_ID,
  SET_SORT_BY,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
  STRING,
} from '../../constants';

const DataWrapper = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, APP_INITIAL_STATE);

  const fetchMovies = async () => {
    dispatch({ type: SET_LOADING, value: true, text: 'Getting movies ...' });

    const data = await API.fetchMovies();

    dispatch({ type: SET_MOVIE_LIST, data });
    dispatch({ type: SET_LOADING, value: false, text: null });
  };

  const fetchCharacters = async (charactersUrls) => {
    dispatch({ type: SET_LOADING, value: true, text: 'The force is searching ...' });

    const { list, uniqueGenders } = await API.fetchCharacters(charactersUrls);

    dispatch({ type: SET_LOADING, value: false, text: null });
    dispatch({ type: SET_FILTER, filter: 'all' });
    dispatch({ type: SET_CHARACTER_LIST, list });
    dispatch({ type: SET_GENDERS, genders: uniqueGenders });
  };

  const onfilterChange = (event) => {
    dispatch({ type: SET_FILTER, filter: event.target.value });
  };

  const toggleKeyOrder = (key, type = STRING) => {
    const { order } = state;
    const reverseOrder = order[key] === ASCENDING_ORDER ? DESCENDING_ORDER : ASCENDING_ORDER;

    dispatch({ type: SET_ORDER, key, value: reverseOrder });
    dispatch({ type: SET_SORT_BY, value: { key, type } });
  };

  const onselectedMovieIdChange = (event) => {
    const { movieList } = state;
    const movieId = movieList.findIndex(movie => String(movie.episode_id) === event.target.value);
    if (movieId !== null && movieId >= 0) {
      fetchCharacters(movieList[movieId].characters);
      dispatch({ type: SET_SELECTED_MOVIE_ID, value: movieId });
    } else {
      dispatch({ type: SET_SELECTED_MOVIE_ID, value: null });
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const contextData = {
    ...state,
    onfilterChange,
    onselectedMovieIdChange,
    toggleKeyOrder,
  };

  return <AppContext.Provider value={contextData}>{children}</AppContext.Provider>;
};

export default DataWrapper;
