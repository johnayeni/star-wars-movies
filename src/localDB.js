import * as idb from 'idb';

export const openDatabase = () => {
  if (!window.indexedDB) {
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

export const storeCharacter = async (character) => {
  const db = await openDatabase();
  if (!db) return;
  const tx = db.transaction('characters', 'readwrite');
  const store = tx.objectStore('characters');
  store.put({ ...character });
  // limit characters been stored on indexed db
  store
    .openCursor(null, 'prev')
    .then(cursor => cursor.advance(300))
    .then(function deleteRest(cursor) {
      if (!cursor) return;
      cursor.delete();
      cursor.continue().then(deleteRest);
    });
};

export const getCharacter = async (id) => {
  const db = await openDatabase();
  if (!db) return null;
  const tx = db.transaction('characters');
  const store = tx.objectStore('characters');
  return store.get(id);
};
