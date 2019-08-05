import React from 'react';
import AppContext from 'context';
import { isArrayAndHasContent, sortHelper } from 'utils';
import { DESCENDING_ORDER, DATE } from '../constants';

const DropdownInput = () => (
  <AppContext.Consumer>
    {({ movieList, loading, onselectedMovieIndexChange }) => (
      <select
        className="select-input"
        onChange={onselectedMovieIndexChange}
        disabled={!isArrayAndHasContent(movieList) || loading}
      >
        {isArrayAndHasContent(movieList) ? (
          <React.Fragment>
            <option>Pick a movie</option>
            {movieList
              .sort((a, b) => sortHelper(a, b, 'release_date', DESCENDING_ORDER, DATE))
              .map(movie => (
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
