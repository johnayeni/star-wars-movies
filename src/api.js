import { getCharacterIdFromURL } from 'utils';
import * as LocalDB from './localDB';
import { API_URL } from './constants';

const memoryData = {};

// eslint-disable-next-line no-undef
export const fetchData = async url => (await fetch(url)).json();

export const fetchMovies = async () => {
  const { results } = await fetchData(`${API_URL}/films`);
  return results;
};

export const fetchCharacters = async (movieId, characterUrls) => {
  let characters = memoryData[movieId];
  if (!characters) {
    characters = await Promise.all(
      characterUrls.map(async (url) => {
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
    memoryData[movieId] = characters;
  }
  return characters;
};
