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
      const {
        data: { results },
      } = response;
      this.setState({ movieList: results });
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ loading: false, loadingText: null });
    }
  };

  fetchCharacters = async characters => {
    let characterList = [];
    this.setState({ loading: true, loadingText: 'Getting character details ...' });
    try {
      for (let character of characters) {
        const response = await axios.get(character);
        characterList.push(response.data);
      }
      this.setState({ characterList });
    } catch (error) {
      console.log(error.message);
    } finally {
      this.setState({ loading: false, loadingText: null });
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

  renderContent = () => {
    const { loading, selectedMovie } = this.state;

    if (loading) {
      return <Loader />;
    } else if (!selectedMovie) {
      return <StarwarsLogo />;
    } else {
      return (
        <React.Fragment>
          <p className="movie-title">{selectedMovie.title}</p>
          <OpeningCrawl content={selectedMovie.opening_crawl} />
          <CharacterList sortCharactersBy={this.sortCharactersBy} />
        </React.Fragment>
      );
    }
  };

  render() {
    return (
      <div className="container">
        <AppContext.Provider value={this.state}>
          <DropdownInput onSelectedMovieChange={this.onSelectedMovieChange} />
          {this.renderContent()}
        </AppContext.Provider>
      </div>
    );
  }
}

export default App;
