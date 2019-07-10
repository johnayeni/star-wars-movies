import React from 'react';
import AppContext from 'context';
import { verifyArray } from 'utils';

class DropdownInput extends React.PureComponent {
  static contextType = AppContext;

  render() {
    const { movieList } = this.context;
    const { onSelectedMovieChange } = this.props;
    return (
      <select
        className="select-input"
        onChange={onSelectedMovieChange}
        disabled={!verifyArray(movieList)}
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
    );
  }
}
export default DropdownInput;
