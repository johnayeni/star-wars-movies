import React from 'react';
import DropdownInput from 'components/DropdownInput';
import OpeningCrawl from 'components/OpeningCrawl';
import CharacterList from 'components/CharacterList';
import StarwarsLogo from 'components/StarwarsLogo';
import Loader from 'components/Loader';
import DataWrapper from 'components/DataWrapper';
import AppContext from 'context';

const App = () => (
  <DataWrapper>
    <AppContext.Consumer>
      {({ loading, selectedMovieId, movieList }) => (
        <div className="container">
          <DropdownInput />
          {loading && <Loader />}
          {!loading && (
            <React.Fragment>
              {selectedMovieId !== null ? (
                <React.Fragment>
                  <p className="movie-title">{movieList[selectedMovieId].title}</p>
                  <OpeningCrawl />
                  <CharacterList />
                </React.Fragment>
              ) : (
                <StarwarsLogo />
              )}
            </React.Fragment>
          )}
        </div>
      )}
    </AppContext.Consumer>
  </DataWrapper>
);

export default App;
