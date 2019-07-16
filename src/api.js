import axios from 'axios';
import axiosRetry from 'axios-retry';
import { sortHelper, getCharacterIdFromURL, handleError } from 'utils';
import LocalDB from './localDB';
import { API_URL, DESCENDING_ORDER, DATE } from './constants';

axiosRetry(axios, { retries: 3 });

class API {
  static fetchData(url) {
    return axios.get(url);
  }

  static async fetchMovies() {
    try {
      const {
        data: { results },
      } = await this.fetchData(`${API_URL}/films`);
      return results.sort((a, b) => sortHelper(a, b, 'release_date', DESCENDING_ORDER, DATE));
    } catch (error) {
      handleError(error.message);
      return [];
    }
  }

  static async fetchCharacters(charactersUrls) {
    try {
      const characterList = await Promise.all(
        charactersUrls.map(async (url) => {
          const characterId = getCharacterIdFromURL(url);
          const localData = await LocalDB.getCharacter(characterId);
          if (localData) return localData;
          const {
            data: { name, gender, height },
          } = await this.fetchData(url);
          LocalDB.storeCharacter({
            name,
            gender,
            height,
            id: characterId,
          });
          return {
            name,
            gender,
            height,
            id: characterId,
          };
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
