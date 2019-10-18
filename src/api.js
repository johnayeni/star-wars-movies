import { API_URL } from "./constants";

// eslint-disable-next-line no-undef
export const fetchData = async url => (await fetch(url)).json();

export async function fetchMovies() {
  const { results } = await fetchData(`${API_URL}/films`);
  return results;
}

export async function fetchCharacters(characterUrls) {
  return Promise.all(
    characterUrls.map(async url => {
      const { name, gender, height } = await fetchData(url);
      const character = { name, gender, height };
      return character;
    })
  );
}
