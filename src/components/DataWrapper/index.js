import React from 'react';
import AppContext from 'context';
import { ASCENDING_ORDER, DESCENDING_ORDER, STRING } from '../../constants';
import { sort } from 'utils';
import API from 'api';

class DataWrapper extends React.Component {
  state = {
    loading: false,
    movieList: [],
    characterList: [],
    selectedMovie: null,
    loadingText: null,
    filter: 'all',
    characterListOrder: {
      name: DESCENDING_ORDER,
      gender: DESCENDING_ORDER,
      height: DESCENDING_ORDER,
    },
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
    this.setState({ characterList: [], loading: true, loadingText: 'The force is searching ...' });
    const characterList = await API.fetchCharacters(charactersUrls);
    this.setState({ characterList, loading: false, loadingText: null });
  };

  onSelectedMovieChange = event => {
    const { movieList } = this.state;
    const movieId = movieList.findIndex(movie => String(movie.episode_id) === event.target.value);
    if (movieId !== null) {
      this.fetchCharacters(movieList[movieId].characters);
      this.setState({ selectedMovie: movieId });
    }
  };

  onfilterChange = event => {
    this.setState({ filter: event.target.value });
  };

  sortCharactersBy = (by, type = STRING) => {
    let { characterListOrder, characterList } = this.state;
    const { [by]: currentState } = characterListOrder;
    if (currentState === ASCENDING_ORDER) {
      characterList = characterList.sort((a, b) => sort(a, b, by, ASCENDING_ORDER, type));
      this.setState({
        characterList,
        characterListOrder: { ...characterListOrder, [by]: DESCENDING_ORDER },
      });
    } else {
      characterList = characterList.sort((a, b) => sort(a, b, by, DESCENDING_ORDER, type));
      this.setState({
        characterList,
        characterListOrder: { ...characterListOrder, [by]: ASCENDING_ORDER },
      });
    }
  };

  render() {
    const { children } = this.props;
    const contextData = {
      ...this.state,
      onfilterChange: this.onfilterChange,
      onSelectedMovieChange: this.onSelectedMovieChange,
      sortCharactersBy: this.sortCharactersBy,
    };
    return <AppContext.Provider value={contextData}>{children}</AppContext.Provider>;
  }
}

export default DataWrapper;
