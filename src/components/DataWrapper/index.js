import React, { useEffect, useState } from 'react';
import AppContext from 'context';
import * as API from 'api';
import { DESCENDING_ORDER, ASCENDING_ORDER, STRING } from '../../constants';

const DataWrapper = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [movieList, setMovieList] = useState([]);
  const [selectedMovieId, setSelectedMovieId] = useState(null);
  const [loadingText, setLoadingText] = useState(null);
  const [filter, setFilter] = useState('all');
  const [characterList, setCharcterList] = useState([]);
  const [genders, setGenders] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [order, setOrder] = useState({
    name: DESCENDING_ORDER,
    gender: DESCENDING_ORDER,
    height: DESCENDING_ORDER,
  });

  const fetchMovies = async () => {
    setLoading(true);
    setLoadingText('Fetching Movies ...');
    const data = await API.fetchMovies();
    setMovieList([...data]);
    setLoading(false);
    setLoadingText('null');
  };

  const fetchCharacters = async (charactersUrls) => {
    setLoading(true);
    setLoadingText('The force is searching ...');
    const { list, uniqueGenders } = await API.fetchCharacters(charactersUrls);
    setLoading(false);
    setLoadingText(null);
    setCharcterList([...list]);
    setGenders(['all', ...uniqueGenders]);
  };

  const onfilterChange = (event) => {
    setFilter(event.target.value);
  };

  const toggleKeyOrder = (key, type = STRING) => {
    const reverseOrder = order[key] === ASCENDING_ORDER ? DESCENDING_ORDER : ASCENDING_ORDER;
    setOrder({ ...order, [key]: reverseOrder });
    setSortBy({ key, type });
  };

  const onselectedMovieIdChange = (event) => {
    const movieId = movieList.findIndex(movie => String(movie.episode_id) === event.target.value);
    if (movieId !== null && movieId >= 0) {
      fetchCharacters(movieList[movieId].characters);
      setSelectedMovieId(movieId);
    } else {
      setSelectedMovieId(null);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  const contextData = {
    loading,
    loadingText,
    characterList,
    movieList,
    genders,
    sortBy,
    order,
    selectedMovieId,
    filter,
    onfilterChange,
    onselectedMovieIdChange,
    toggleKeyOrder,
  };

  return <AppContext.Provider value={contextData}>{children}</AppContext.Provider>;
};

export default DataWrapper;
