import React from 'react';
import AppContext from 'context';
import { DESCENDING_ORDER, STRING } from '../../constants';
import { sortCharacters } from 'utils';
import API from 'api';

class DataWrapper extends React.Component {
  state = {
    loading: false,
    movieList: [],
    characters: {
      list: [],
      order: {
        name: DESCENDING_ORDER,
        gender: DESCENDING_ORDER,
        height: DESCENDING_ORDER,
      },
    },
    selectedMovieId: null,
    loadingText: null,
    filter: 'all',
  };

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    this.setState({ loading: true, loadingText: 'Getting movies ...' });
    const movieList = await API.fetchMovies();
    this.setState({ movieList, loading: false, loadingText: null });
  };

  fetchCharacters = async charactersUrls => {
    const { characters } = this.state;
    this.setState({
      characters: { ...characters, list: [] },
      loading: true,
      loadingText: 'The force is searching ...',
    });
    const characterList = await API.fetchCharacters(charactersUrls);
    this.setState({
      characters: { ...characters, list: characterList },
      loading: false,
      loadingText: null,
    });
  };

  onselectedMovieIdChange = event => {
    const { movieList } = this.state;
    const movieId = movieList.findIndex(movie => String(movie.episode_id) === event.target.value);
    if (movieId !== null) {
      this.fetchCharacters(movieList[movieId].characters);
      this.setState({ selectedMovieId: movieId });
    }
  };

  onfilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  sortCharacters = (key, type = STRING) => {
    const { characters } = this.state;
    const sortedCharcters = sortCharacters(characters, key, type);
    this.setState({ characters: sortedCharcters });
  };

  render() {
    const { children } = this.props;
    const contextData = {
      ...this.state,
      onfilterChange: this.onfilterChange,
      onselectedMovieIdChange: this.onselectedMovieIdChange,
      sortCharacters: this.sortCharacters,
    };
    return <AppContext.Provider value={contextData}>{children}</AppContext.Provider>;
  }
}

export default DataWrapper;
