import React from 'react';
import AppContext from 'context';
import { isArrayAndHasContent } from 'utils';

const DropdownInput = () => (
  <AppContext.Consumer>
    {({ movies, loading, onSelectedMovieIndexChange }) => (
      <select
        className="select-input"
        aria-label="movies-list"
        onChange={onSelectedMovieIndexChange}
        disabled={!isArrayAndHasContent(movies) || loading}
      >
        {isArrayAndHasContent(movies) ? (
          <React.Fragment>
            <option>Pick a movie</option>
            {movies.map(movie => (
              <option key={movie.episode_id} value={movie.episode_id}>
                {movie.title}
              </option>
            ))}
          </React.Fragment>
        ) : (
          <option>No movies available</option>
        )}
      </select>
    )}
  </AppContext.Consumer>
);
export default DropdownInput;
