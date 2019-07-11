import React from 'react';
import axios from 'axios';
import DropdownInput from 'components/DropdownInput';
import OpeningCrawl from 'components/OpeningCrawl';
import CharacterList from 'components/CharacterList';
import StarwarsLogo from 'components/StarwarsLogo';
import Loader from 'components/Loader';
import AppContext from 'context';
import { ASCENDING_ORDER, DESCENDING_ORDER, API_URL, DATE, STRING } from './constants';
import { sort, handleError } from 'utils';

class App extends React.Component {
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
    try {
      const response = await axios.get(`${API_URL}/films`);
      let {
        data: { results },
      } = response;
      results = results.sort((a, b) => sort(a, b, 'release_date', ASCENDING_ORDER, DATE));
      this.setState({ movieList: results });
    } catch (error) {
      handleError(error.message);
    } finally {
      this.setState({ loading: false, loadingText: null });
    }
  };

  fetchCharacters = async characters => {
    let characterList = [];
    this.setState({ loading: true });
    try {
      for (let character of characters) {
        const response = await axios.get(character);
        characterList.push(response.data);
        this.setState({ characterList });
      }
    } catch (error) {
      handleError(error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  onSelectedMovieChange = event => {
    const { movieList } = this.state;
    const movie = movieList.find(movie => String(movie.episode_id) === event.target.value);
    if (movie && movie.characters) {
      this.setState({ selectedMovie: { ...movie } });
      this.fetchCharacters(movie.characters);
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
    const { loading, selectedMovie } = this.state;
    const contextData = {
      ...this.state,
      onfilterChange: this.onfilterChange,
      onSelectedMovieChange: this.onSelectedMovieChange,
      sortCharactersBy: this.sortCharactersBy,
    };
    return (
      <div className="container">
        <AppContext.Provider value={contextData}>
          <DropdownInput />
          {loading && !selectedMovie && <Loader />}
          {!loading && !selectedMovie && <StarwarsLogo />}
          {selectedMovie && (
            <React.Fragment>
              <p className="movie-title">{selectedMovie.title}</p>
              <OpeningCrawl />
              {loading && <Loader />}
              <CharacterList />
            </React.Fragment>
          )}
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
