import React from 'react';
import AppContext from 'context';
import {
  isArrayAndHasContent,
  getTotalHeight,
  convertCentimetresToFeetPerInches,
  compareObjFn,
} from 'utils';
import GenderFilter from 'components/GenderFilter';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import TableFooter from './components/TableFooter';

const CharacterList = () => (
  <AppContext.Consumer>
    {({
      movies,
      characters,
      sortOrder,
      sortBy,
      toggleKeyOrder,
      selectedMovieIndex,
      filter,
      onfilterChange,
    }) => {
      const { key, type } = sortBy;
      const movieId = movies[selectedMovieIndex].episode_id;
      const movieCharacters = characters[movieId];
      const filteredAndSortedCharacters = movieCharacters
        .filter(character => filter === 'all' || character.gender === filter)
        .sort((currentCharacter, nextCharacter) => compareObjFn({
          currentObj: currentCharacter,
          nextObj: nextCharacter,
          key,
          sortOrder: sortOrder[key],
          type,
        }));
      const charactersTotalHeight = movieCharacters.reduce(getTotalHeight, 0);
      const heightInFeetPerInches = convertCentimetresToFeetPerInches(charactersTotalHeight);
      const noOfCharacters = movieCharacters.length;

      return (
        <div id="characters">
          <p className="title">Characters</p>
          <GenderFilter
            characters={movieCharacters}
            filter={filter}
            onfilterChange={onfilterChange}
          />
          {isArrayAndHasContent(movieCharacters) ? (
            <React.Fragment>
              <table className="character-list-table">
                <TableHeader toggleKeyOrder={toggleKeyOrder} sortOrder={sortOrder} />
                <TableBody characters={filteredAndSortedCharacters} />
                <TableFooter
                  noOfCharacters={noOfCharacters}
                  heightInFeetPerInches={heightInFeetPerInches}
                  charactersTotalHeight={charactersTotalHeight}
                />
              </table>
            </React.Fragment>
          ) : (
            <p className="text--white">No characters available</p>
          )}
        </div>
      );
    }}
  </AppContext.Consumer>
);

export default CharacterList;
