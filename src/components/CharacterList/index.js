/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import AppContext from 'context';
import {
  determineGender,
  verifyArray,
  getTotalHeight,
  convertCentimetresToFeetPerInches,
} from 'utils';
import GenderFilter from 'components/GenderFilter';
import { NUMBER } from '../../constants';

const CharacterList = () => (
  <AppContext.Consumer>
    {({
      characterList, loading, filter, sortCharactersBy,
    }) => {
      let filteredCharacterList = [...characterList];
      if (filter !== 'all') {
        filteredCharacterList = characterList.filter(character => character.gender === filter);
      }
      const charactersTotalHeight = filteredCharacterList.reduce(getTotalHeight, 0);
      const heightInFeetPerInches = convertCentimetresToFeetPerInches(charactersTotalHeight);
      return (
        <div id="characters">
          <p>Characters</p>
          {!loading && <GenderFilter />}
          {
            <React.Fragment>
              {loading && !verifyArray(filteredCharacterList) ? (
                <p className="text--white">The force is searching ...</p>
              ) : (
                <React.Fragment>
                  {verifyArray(filteredCharacterList) ? (
                    <React.Fragment>
                      <table className="character-list-table">
                        <thead>
                          <tr>
                            <td onClick={() => sortCharactersBy('name')}>Name</td>
                            <td onClick={() => sortCharactersBy('gender')}>Gender</td>
                            <td onClick={() => sortCharactersBy('height', NUMBER)}>
                              Height (cm)
                            </td>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredCharacterList.map(character => (
                            <tr key={character.name}>
                              <td>{character.name}</td>
                              <td>{determineGender(character.gender)}</td>
                              <td>{character.height === 'unknown' ? 'N/A' : character.height}</td>
                            </tr>
                          ))}
                        </tbody>
                        <tfoot>
                          <tr>
                            <td>No. of characters</td>
                            <td colSpan={2} className="text--white">
                              {filteredCharacterList.length}
                            </td>
                          </tr>
                          <tr>
                            <td>Total height sum</td>
                            <td colSpan={2} className="text--white">
                              {`${charactersTotalHeight} cm (${
                                heightInFeetPerInches.feet
                              } ft/${
                                heightInFeetPerInches.inches
                              } inches)`}
                            </td>
                          </tr>
                        </tfoot>
                      </table>
                    </React.Fragment>
                  ) : (
                    <p className="text--white">No characters available</p>
                  )}
                </React.Fragment>
              )}
            </React.Fragment>
          }
        </div>
      );
    }}
  </AppContext.Consumer>
);

export default CharacterList;
