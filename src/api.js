import axios from 'axios';
import { sortHelper, getCharacterIdFromURL, handleError } from 'utils';
import * as LocalDB from './localDB';
import { API_URL, DESCENDING_ORDER, DATE } from './constants';

const localData = {};

export const fetchData = url => axios.get(url);

export const fetchMovies = async () => {
  try {
    const {
      data: { results },
    } = await fetchData(`${API_URL}/films`);
    return results.sort((a, b) => sortHelper(a, b, 'release_date', DESCENDING_ORDER, DATE));
  } catch (error) {
    handleError(error.message);
    return [];
  }
};

export const fetchCharacters = async (movieId, charactersUrls) => {
  try {
    let list = localData[movieId];
    if (!list) {
      list = await Promise.all(
        charactersUrls.map(async (url) => {
          const characterId = getCharacterIdFromURL(url);
          const storedCharacter = await LocalDB.getCharacter(characterId);
          if (storedCharacter) return storedCharacter;
          const {
            data: { name, gender, height },
          } = await fetchData(url);
          const character = {
            name,
            gender,
            height,
            id: characterId,
          };
          LocalDB.storeCharacter(character);
          return character;
        }),
      );
      localData[movieId] = list;
    }
    const genders = list.map(character => character.gender);
    const uniqueGenders = Array.from(new Set(genders));
    return { list, uniqueGenders };
  } catch (error) {
    handleError(error.message);
    return { list: [], uniqueGenders: [] };
  }
};
