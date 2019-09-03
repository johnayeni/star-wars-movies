/* eslint-disable no-undef */
/* eslint-disable no-alert */
import React, { useEffect } from 'react';
import * as API from 'api';
import useLocalStorage from 'useLocalStorage';
import {
  APP_INITIAL_STATE,
  SET_CHARACTERS,
  SET_FILTER,
  SET_LOADING,
  SET_MOVIES,
  SET_SORT_ORDER,
  SET_SELECTED_MOVIE_INDEX,
  SET_SORT_BY,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
  STRING,
} from '../constants';

const DataWrapper = ({ render }) => {
  const [state, dispatch] = useLocalStorage(APP_INITIAL_STATE);

  const handleError = (fn) => {
    try {
      fn();
    } catch (error) {
      window.alert(error.message);
    }
  };

  const runAsyncFn = async (fn, args = []) => {
    dispatch({ type: SET_LOADING, value: true, text: 'The force is searching ...' });
    await fn(...args);
    dispatch({ type: SET_LOADING, value: false, text: null });
  };

  const setCharacters = async (movieId, characterUrls) => {
    dispatch({ type: SET_CHARACTERS, characters: [] });
    const characters = await API.fetchCharacters(characterUrls);
    dispatch({ type: SET_CHARACTERS, movieId, characters });
  };

  const onfilterChange = (event) => {
    dispatch({ type: SET_FILTER, filter: event.target.value });
  };

  const toggleKeyOrder = (key, type = STRING) => {
    const { sortOrder } = state;
    const reverseOrder = sortOrder[key] === ASCENDING_ORDER ? DESCENDING_ORDER : ASCENDING_ORDER;
    dispatch({ type: SET_SORT_ORDER, key, value: reverseOrder });
    dispatch({ type: SET_SORT_BY, value: { key, type } });
  };

  const onSelectedMovieIndexChange = (event) => {
    dispatch({ type: SET_FILTER, filter: 'all' });
    const { movies, characters } = state;
    const movieIndex = movies.findIndex(movie => String(movie.episode_id) === event.target.value);
    if (movieIndex !== null && movieIndex >= 0) {
      const movieId = movies[movieIndex].episode_id;
      if (!characters[movieId] || characters[movieId].length < 1) {
        handleError(() => runAsyncFn(setCharacters, [movieId, movies[movieIndex].characters]));
      }
      dispatch({ type: SET_SELECTED_MOVIE_INDEX, value: movieIndex });
    } else {
      dispatch({ type: SET_SELECTED_MOVIE_INDEX, value: null });
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      const data = await API.fetchMovies();
      dispatch({ type: SET_MOVIES, movies: data });
    };
    dispatch({ type: SET_FILTER, filter: 'all' });
    dispatch({ type: SET_SELECTED_MOVIE_INDEX, value: null });
    handleError(() => runAsyncFn(getMovies));
  }, []);

  const contextData = {
    ...state,
    onfilterChange,
    onSelectedMovieIndexChange,
    toggleKeyOrder,
  };
  return <React.Fragment>{render(contextData)}</React.Fragment>;
};

export default DataWrapper;
