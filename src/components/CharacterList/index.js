import React from 'react';
import AppContext from 'context';
import { verifyArray, getTotalHeight, convertCentimetresToFeetPerInches, sortCharacters } from 'utils';
import GenderFilter from 'components/GenderFilter';
import TableHeader from './components/TableHeader';
import TableBody from './components/TableBody';
import TableFooter from './components/TableFooter';

const CharacterList = () => (
  <AppContext.Consumer>
    {({ characterList, sortBy, order, filter, toggleKeyOrder }) => {
      let filteredCharacterList = [...characterList];
      if (filter !== 'all') {
        filteredCharacterList = characterList.filter(character => character.gender === filter);
      }
      if (sortBy) {
        const { key, type } = sortBy;
        filteredCharacterList = sortCharacters(filteredCharacterList, key, order[key], type);
      }
      const charactersTotalHeight = filteredCharacterList.reduce(getTotalHeight, 0);
      const heightInFeetPerInches = convertCentimetresToFeetPerInches(charactersTotalHeight);
      const noOfCharacters = filteredCharacterList.length;

      return (
        <div id="characters">
          <p className="title">Characters</p>
          <GenderFilter />
          {verifyArray(filteredCharacterList) ? (
            <React.Fragment>
              <table className="character-list-table">
                <TableHeader toggleKeyOrder={toggleKeyOrder} />
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
