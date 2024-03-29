/* eslint-disable no-undef */
/* eslint-disable no-use-before-define */
import { useEffect, useCallback } from 'react';
import * as API from 'api';
import createPersistedReducer from 'use-persisted-reducer';
import AppReducer from 'reducer';
import { isArrayAndHasContent } from 'utils';
import {
  APP_INITIAL_STATE,
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
  ASCENDING_ORDER,
  DESCENDING_ORDER,
  STRING,
} from '../constants';

const usePersistedReducer = createPersistedReducer('state', globalThis.sessionStorage);

export default function DataWrapper({ render }) {
  const {
    state, onfilterChange, onSelectedMovieIndexChange, toggleKeyOrder,
  } = useLocalState();
  const contextData = {
    ...state,
    onfilterChange,
    onSelectedMovieIndexChange,
    toggleKeyOrder,
  };
  return render(contextData);
}

function useLocalState() {
  const [state, dispatch] = usePersistedReducer(AppReducer, APP_INITIAL_STATE);
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
    dispatch({ type: RESET_FILTER });
    const { movies } = state;
    const movieIndex = movies.findIndex(movie => String(movie.episode_id) === event.target.value);
    dispatch({ type: SET_SELECTED_MOVIE_INDEX, value: movieIndex >= 0 ? movieIndex : null });
  };

  useEffect(
    useCallback(() => {
      const setCharacters = async (movieId, characterUrls) => {
        dispatch({
          type: SET_LOADING,
          value: true,
          text: 'The force is searching...',
        });
        try {
          const characters = await API.fetchCharacters(characterUrls);
          dispatch({ type: SET_CHARACTERS, movieId, characters });
        } catch (error) {
          globalThis.window.alert(error.message);
        } finally {
          dispatch({ type: RESET_LOADING });
        }
      };

      const { selectedMovieIndex, characters, movies } = state;
      if (selectedMovieIndex !== null) {
        const movieId = movies[selectedMovieIndex].episode_id;
        if (!isArrayAndHasContent(characters[movieId])) {
          setCharacters(movieId, movies[selectedMovieIndex].characters);
        }
      }
    }, [dispatch, state]),
    [state.selectedMovieIndex],
  );

  useEffect(
    useCallback(() => {
      const setMovies = async () => {
        dispatch({
          type: SET_LOADING,
          value: true,
          text: 'Fetching movies ...',
        });
        try {
          const data = await API.fetchMovies();
          dispatch({ type: SET_MOVIES, movies: data });
        } catch (error) {
          globalThis.window.alert(error.message);
        } finally {
          dispatch({ type: RESET_LOADING });
        }
      };

      dispatch({ type: RESET_STATE });
      const { movies } = state;
      if (movies.length < 1) setMovies();
    }, [dispatch, state]),
    [],
  );

  return {
    state,
    onfilterChange,
    onSelectedMovieIndexChange,
    toggleKeyOrder,
  };
}
