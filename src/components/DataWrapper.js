import React, { useEffect, useReducer } from 'react';
import * as API from 'api';
import AppReducer from 'reducer';
import { sortComparator } from 'utils';
import {
  APP_INITIAL_STATE,
  SET_CHARACTERS,
  SET_FILTER,
  SET_LOADING,
  SET_MOVIES,
  SET_SORT_ORDER,
  SET_SELECTED_MOVIE_INDEX,
  SET_ERROR_MSG,
  SET_SORT_BY,
  ASCENDING_ORDER,
  DESCENDING_ORDER,
  STRING,
  DATE,
} from '../constants';

const DataWrapper = ({ render }) => {
  const [state, dispatch] = useReducer(AppReducer, APP_INITIAL_STATE);

  const showErrorMsg = (msg = 'Unknown error occured') => {
    dispatch({ type: SET_ERROR_MSG, msg });
    setTimeout(() => {
      dispatch({ type: SET_ERROR_MSG, msg: null });
    }, 10000);
  };

  const getCharacters = async (movieId, characterUrls) => {
    dispatch({ type: SET_LOADING, value: true, text: 'The force is searching ...' });
    dispatch({ type: SET_CHARACTERS, characters: [] });
    try {
      const characters = await API.fetchCharacters(movieId, characterUrls);
      dispatch({ type: SET_CHARACTERS, characters });
    } catch (error) {
      showErrorMsg(error.message);
    } finally {
      dispatch({ type: SET_LOADING, value: false, text: null });
    }
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
    const { movies } = state;
    const movieIndex = movies.findIndex(movie => String(movie.episode_id) === event.target.value);
    if (movieIndex !== null && movieIndex >= 0) {
      getCharacters(movies[movieIndex].episode_id, movies[movieIndex].characters);
      dispatch({ type: SET_SELECTED_MOVIE_INDEX, value: movieIndex });
    } else {
      dispatch({ type: SET_SELECTED_MOVIE_INDEX, value: null });
    }
  };

  useEffect(() => {
    const getMovies = async () => {
      dispatch({ type: SET_LOADING, value: true, text: 'Getting movies ...' });
      try {
        const movies = await API.fetchMovies();
        const sortedMovieList = movies.sort((a, b) => sortComparator(a, b, 'release_date', DESCENDING_ORDER, DATE));
        dispatch({ type: SET_MOVIES, movies: sortedMovieList });
      } catch (error) {
        showErrorMsg(error.message);
      } finally {
        dispatch({ type: SET_LOADING, value: false, text: null });
      }
    };
    getMovies();
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
