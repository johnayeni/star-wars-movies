import React, { Suspense } from 'react';
import DropdownInput from 'components/DropdownInput';
import OpeningCrawl from 'components/OpeningCrawl';
import CharacterList from 'components/CharacterList';
import StarwarsLogo from 'components/StarwarsLogo';
import Loader from 'components/Loader';
import AppContext from 'context';

const Root = () => (
  <AppContext.Consumer>
    {({ loading, selectedMovieId, movieList }) => (
      <div className="container">
        <DropdownInput />
        {loading ? (
          <Loader />
        ) : (
          <React.Fragment>
            {selectedMovieId !== null && selectedMovieId >= 0 ? (
              <React.Fragment>
                <p className="movie-title">{movieList[selectedMovieId].title}</p>
                <OpeningCrawl />
                <Suspense>
                  <CharacterList />
                </Suspense>
              </React.Fragment>
            ) : (
              <StarwarsLogo />
            )}
          </React.Fragment>
        )}
      </div>
    )}
  </AppContext.Consumer>
);
export default Root;
