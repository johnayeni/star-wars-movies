import React, { useEffect, useReducer } from 'react';
import * as API from 'api';
import AppReducer from 'reducer';
import {
  APP_INITIAL_STATE,
  SET_CHARACTER_LIST,
  SET_FILTER,
  SET_LOADING,
  SET_MOVIE_LIST,
  SET_ORDER,
  SET_SELECTED_MOVIE_ID,
  SET_SORT_BY,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
  STRING,
} from '../constants';

const DataWrapper = ({ render }) => {
  const [state, dispatch] = useReducer(AppReducer, APP_INITIAL_STATE);

  const fetchMovies = async () => {
    dispatch({ type: SET_LOADING, value: true, text: 'Getting movies ...' });

    const data = await API.fetchMovies();

    dispatch({ type: SET_MOVIE_LIST, data });
    dispatch({ type: SET_LOADING, value: false, text: null });
  };

  const fetchCharacters = async (movieId, charactersUrls) => {
    dispatch({ type: SET_LOADING, value: true, text: 'The force is searching ...' });

    const data = await API.fetchCharacters(movieId, charactersUrls);
    dispatch({ type: SET_LOADING, value: false, text: null });
    dispatch({ type: SET_FILTER, filter: 'all' });
    dispatch({ type: SET_CHARACTER_LIST, data });
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

  const onselectedMovieIndexChange = (event) => {
    const { movieList } = state;
    const movieIndex = movieList.findIndex(
      movie => String(movie.episode_id) === event.target.value,
    );

    if (movieIndex !== null && movieIndex >= 0) {
      fetchCharacters(movieList[movieIndex].episode_id, movieList[movieIndex].characters);
      dispatch({ type: SET_SELECTED_MOVIE_ID, value: movieIndex });
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
    onselectedMovieIndexChange,
    toggleKeyOrder,
  };

  return <React.Fragment>{render(contextData)}</React.Fragment>;
};

export default DataWrapper;
