import { API_URL } from './constants';

// eslint-disable-next-line no-undef
export const fetchData = async url => (await fetch(url)).json();

export const fetchMovies = async () => {
  const { results } = await fetchData(`${API_URL}/films`);
  return results;
};

export const fetchCharacters = characterUrls => Promise.all(
  characterUrls.map(async (url) => {
    const { name, gender, height } = await fetchData(url);
    const character = { name, gender, height };
    return character;
  }),
);
