import React, { useContext } from 'react';
import AppContext from 'context';
import { isArrayAndHasContent, compareObjFn } from 'utils';
import { DESCENDING_ORDER, DATE } from '../constants';

const DropdownInput = () => {
  const { movies, loading, onSelectedMovieIndexChange } = useContext(AppContext);
  const sortedMovies = [...movies].sort((currentMovie, nextMovie) => compareObjFn({
    currentObj: currentMovie,
    nextObj: nextMovie,
    key: 'release_date',
    sortOrder: DESCENDING_ORDER,
    type: DATE,
  }));
  return (
    <select
      className="select-input"
      aria-label="movies-list"
      onChange={onSelectedMovieIndexChange}
      disabled={!isArrayAndHasContent(sortedMovies) || loading}
    >
      {isArrayAndHasContent(sortedMovies) ? (
        <React.Fragment>
          <option>Pick a movie</option>
          {sortedMovies.map(movie => (
            <option key={movie.episode_id} value={movie.episode_id}>
              {movie.title}
            </option>
          ))}
        </React.Fragment>
      ) : (
        <option>No movies available</option>
      )}
    </select>
  );
};
export default DropdownInput;
