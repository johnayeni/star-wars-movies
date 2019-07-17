import React, { useEffect, useState } from 'react';
import AppContext from 'context';
import { SortCharacters } from 'utils';
import * as API from 'api';
import { DESCENDING_ORDER, STRING } from '../../constants';

const DataWrapper = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [loadingText, setLoadingText] = useState(null);
  const [filter, setFilter] = useState('all');
  const [characters, setCharcters] = useState({
    list: [],
    order: {
      name: DESCENDING_ORDER,
      gender: DESCENDING_ORDER,
      height: DESCENDING_ORDER,
    },
  });

  const fetchMovies = async () => {
    setLoading(true);
    setLoadingText('Fetching Movies ...');
    const data = await API.fetchMovies();
    setMovieList(data);
    setLoading(false);
    setLoadingText('null');
  };

  const fetchCharacters = async (charactersUrls) => {
    setLoading(true);
    setLoadingText('The force is searching ...');
    setCharcters({ ...characters, list: [] });
    const data = await API.fetchCharacters(charactersUrls);
    setLoading(false);
    setLoadingText(null);
    setCharcters({ ...characters, list: data });
  };

  const onfilterChange = (event) => {
    setFilter(event.target.value);
  };

  const sortCharacters = (key, type = STRING) => {
    const sortedCharcters = SortCharacters(characters, key, type);
    setCharcters(sortedCharcters);
  };

  const onselectedMovieIdChange = (event) => {
    const movieId = movieList.findIndex(movie => String(movie.episode_id) === event.target.value);
    if (movieId !== null) {
      fetchCharacters(movieList[movieId].characters);
      setSelectedMovieId(movieId);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const contextData = {
    loading,
    loadingText,
    characters,
    movieList,
    selectedMovieId,
    filter,
    onfilterChange,
    onselectedMovieIdChange,
    sortCharacters,
  };

  return <AppContext.Provider value={contextData}>{children}</AppContext.Provider>;
};

export default DataWrapper;
