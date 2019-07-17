import React from 'react';
import AppContext from 'context';
import { verifyArray, getTotalHeight, convertCentimetresToFeetPerInches } from 'utils';
import GenderFilter from 'components/GenderFilter';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import TableFooter from './components/TableFooter';

const CharacterList = () => (
  <AppContext.Consumer>
    {({ characters: { list }, filter, sortCharacters }) => {
      let filteredCharacterList = [...list];
      if (filter !== 'all') {
        filteredCharacterList = list.filter(character => character.gender === filter);
      }
      const charactersTotalHeight = filteredCharacterList.reduce(getTotalHeight, 0);
      const heightInFeetPerInches = convertCentimetresToFeetPerInches(charactersTotalHeight);
      const noOfCharacters = filteredCharacterList.length;

      return (
        <div id="characters">
          <p className="title">Characters</p>
          <hr />
          <GenderFilter />
          {verifyArray(filteredCharacterList) ? (
            <React.Fragment>
              <table className="character-list-table">
                <TableHeader sortCharacters={sortCharacters} />
                <TableBody filteredCharacterList={filteredCharacterList} />
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
