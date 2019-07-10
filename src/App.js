import React from 'react';
import axios from 'axios';
import DropdownInput from './components/DropdownInput';
import OpeningCrawl from './components/OpeningCrawl';
import CharacterList from './components/CharacterList';
import StarwarsLogo from './components/StarwarsLogo';
import Loader from './components/Loader';
import AppContext from './context';
import { ASCENDING_ORDER, DESCENDING_ORDER } from './constants';
import { sort } from './utils';

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

  apiUrl = 'https://swapi.co/api';

  componentDidMount() {
    this.fetchMovies();
  }

  fetchMovies = async () => {
    this.setState({ loading: true, loadingText: 'Getting movies ...' });
    try {
      const response = await axios.get(`${this.apiUrl}/films`);
      let {
        data: { results },
      } = response;
      results = results.sort((a, b) => sort(a, b, 'release_date', ASCENDING_ORDER, 'date'));
      this.setState({ movieList: results });
    } catch (error) {
      console.log(error.message);
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
      }
      this.setState({ characterList });
    } catch (error) {
      console.log(error.message);
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
    console.log(event.target.value);
    this.setState({ filter: event.target.value });
  };

  sortCharactersBy = (by, type = 'string') => {
    let { characterListOrder, characterList } = this.state;
    const { [by]: currentState } = characterListOrder;
    if (currentState === ASCENDING_ORDER) {
      characterList = characterList.sort((a, b) => sort(a, b, [by], ASCENDING_ORDER, type));
      this.setState({
        characterList,
        characterListOrder: { ...characterListOrder, [by]: DESCENDING_ORDER },
      });
    } else {
      characterList = characterList.sort((a, b) => sort(a, b, [by], DESCENDING_ORDER, type));
      this.setState({
        characterList,
        characterListOrder: { ...characterListOrder, [by]: ASCENDING_ORDER },
      });
    }
  };

  render() {
    const { loading, selectedMovie } = this.state;
    return (
      <div className="container">
        <AppContext.Provider value={{ ...this.state, onfilterChange: this.onfilterChange }}>
          <DropdownInput onSelectedMovieChange={this.onSelectedMovieChange} />
          {loading && !selectedMovie && <Loader />}
          {!loading && !selectedMovie && <StarwarsLogo />}
          {selectedMovie && (
            <React.Fragment>
              <p className="movie-title">{selectedMovie.title}</p>
              <OpeningCrawl content={selectedMovie.opening_crawl} />
              {loading && <Loader />}
              <CharacterList sortCharactersBy={this.sortCharactersBy} />
            </React.Fragment>
          )}
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
