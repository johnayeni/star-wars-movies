import * as idb from 'idb';

export const openDatabase = () => {
  // eslint-disable-next-line no-undef
  if (!window.indexedDB) {
    // eslint-disable-next-line no-console
    console.log(
      "Your browser doesn't support a stable version of IndexedDB. Such and such feature will not be available.",
    );
    return null;
  }
  return idb.openDB('star-wars-movies', 1, {
    upgrade(db) {
      db.createObjectStore('characters', { keyPath: 'id' });
    },
  });
};

const createObJextStore = async () => {
  const db = await openDatabase();
  const tx = db.transaction('characters', 'readwrite');
  return tx.objectStore('characters');
};

export const storeCharacter = async (character) => {
  const store = await createObJextStore();
  store.put({ ...character });
};

export const getCharacter = async (id) => {
  const store = await createObJextStore();
  return store.get(id);
};
