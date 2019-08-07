import React from 'react';
import AppContext from 'context';
import {
  isArrayAndHasContent,
  getTotalHeight,
  convertCentimetresToFeetPerInches,
  sortCharacters,
} from 'utils';
import GenderFilter from 'components/GenderFilter';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import TableFooter from './components/TableFooter';

const CharacterList = () => (
  <AppContext.Consumer>
    {({
      characters, sortBy, sortOrder, filter, toggleKeyOrder,
    }) => {
      let filteredCharacterList = characters;
      if (filter !== 'all') {
        filteredCharacterList = characters.filter(character => character.gender === filter);
      }
      if (sortBy) {
        const { key, type } = sortBy;
        filteredCharacterList = sortCharacters(filteredCharacterList, key, sortOrder[key], type);
      }
      const charactersTotalHeight = filteredCharacterList.reduce(getTotalHeight, 0);
      const heightInFeetPerInches = convertCentimetresToFeetPerInches(charactersTotalHeight);
      const noOfCharacters = filteredCharacterList.length;

      return (
        <div id="characters">
          <p className="title">Characters</p>
          <GenderFilter />
          {isArrayAndHasContent(filteredCharacterList) ? (
            <React.Fragment>
              <table className="character-list-table">
                <TableHeader toggleKeyOrder={toggleKeyOrder} sortOrder={sortOrder} />
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
