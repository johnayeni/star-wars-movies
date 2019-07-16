import axios from 'axios';
import { sort, handleError } from 'utils';
import { API_URL, ASCENDING_ORDER, DATE } from './constants';

class API {
  static fetchData(url) {
    return axios.get(url);
  }

  static async fetchMovies() {
    try {
      const {
        data: { results },
      } = await this.fetchData(`${API_URL}/films`);
      return results.sort((a, b) => sort(a, b, 'release_date', ASCENDING_ORDER, DATE));
    } catch (error) {
      handleError(error.message);
      return [];
    }
  }

  static async fetchCharacters(charactersUrls) {
    try {
      const characterList = await Promise.all(
        charactersUrls.map(async (url) => {
          const { data } = await this.fetchData(url);
          return data;
        }),
      );
      return characterList;
    } catch (error) {
      handleError(error.message);
      return [];
    }
  }
}

export default API;
