import React from 'react';
import axios from 'axios';
import DropdownInput from './components/DropdownInput';
import OpeningCrawl from './components/OpeningCrawl';
import CharacterList from './components/CharacterList';
import StarwarsLogo from './components/StarwarsLogo';
import Loader from './components/Loader';
import AppContext from './context';

class App extends React.Component {
  state = {
    loading: false,
    movieList: [],
    characterList: [],
    selectedMovie: null,
    loadingText: null,
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
    const movie = movieList.find(movie => movie.episode_id == event.target.value);
    if (movie && movie.characters) {
      this.setState({ selectedMovie: { ...movie } });
      this.fetchCharacters(movie.characters);
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
          <CharacterList />
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
