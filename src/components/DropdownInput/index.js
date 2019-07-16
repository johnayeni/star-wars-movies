import React from 'react';
import AppContext from 'context';
import { verifyArray } from 'utils';

const DropdownInput = () => (
  <AppContext.Consumer>
    {({ movieList, loading, onselectedMovieIdChange }) => (
      <select
        className="select-input"
        onChange={onselectedMovieIdChange}
        disabled={!verifyArray(movieList) || loading}
      >
        {verifyArray(movieList) ? (
          <React.Fragment>
            <option>Pick a movie</option>
            {movieList.map(movie => (
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
