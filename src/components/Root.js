import React, { useContext } from 'react';
import DropdownInput from 'components/DropdownInput';
import OpeningCrawl from 'components/OpeningCrawl';
import CharacterList from 'components/CharacterList';
import StarwarsLogo from 'components/StarwarsLogo';
import Loader from 'components/Loader';
import AppContext from 'context';

function Root() {
  const { loading, selectedMovieIndex, movies } = useContext(AppContext);
  return (
    <div className="container">
      <DropdownInput />
      {loading ? (
        <Loader />
      ) : (
        <React.Fragment>
          {selectedMovieIndex !== null && selectedMovieIndex >= 0 ? (
            <React.Fragment>
              <p className="movie-title">{movies[selectedMovieIndex].title}</p>
              <OpeningCrawl />
              <CharacterList />
            </React.Fragment>
          ) : (
            <StarwarsLogo />
          )}
        </React.Fragment>
      )}
    </div>
  );
}

export default Root;
