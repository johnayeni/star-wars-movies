import React from 'react';
import AppContext from 'context';

class DropdownInput extends React.PureComponent {
  static contextType = AppContext;

  render() {
    const { movieList } = this.context;
    const { onSelectedMovieChange } = this.props;
    return (
      <select
        className="select-input"
        onChange={onSelectedMovieChange}
        disabled={!(Array.isArray(movieList) && movieList.length > 0)}
      >
        {Array.isArray(movieList) && movieList.length > 0 ? (
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
