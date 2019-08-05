import { getCharacterIdFromURL, handleError } from 'utils';
import * as LocalDB from './localDB';
import { API_URL } from './constants';

const memoryData = {};

// eslint-disable-next-line no-undef
export const fetchData = async url => (await fetch(url)).json();

export const fetchMovies = async () => {
  try {
    const { results } = await fetchData(`${API_URL}/films`);
    return results;
  } catch (error) {
    handleError(error.message);
    return [];
  }
};

export const fetchCharacters = async (movieId, charactersUrls) => {
  try {
    let characterList = memoryData[movieId];
    if (!characterList) {
      characterList = await Promise.all(
        charactersUrls.map(async (url) => {
          const characterId = getCharacterIdFromURL(url);
          const storedCharacter = await LocalDB.getCharacter(characterId);
          if (storedCharacter) return storedCharacter;
          const { name, gender, height } = await fetchData(url);
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
      memoryData[movieId] = characterList;
    }
    return characterList;
  } catch (error) {
    handleError(error.message);
    return [];
  }
};
