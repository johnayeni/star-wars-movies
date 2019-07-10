import React from 'react';
import AppContext from 'context';
import {
  determineGender,
  verifyArray,
  getTotalHeight,
  convertCentimetresToFeetPerInches,
} from 'utils';
import GenderFilter from 'components/GenderFilter';

class CharacterList extends React.PureComponent {
  static contextType = AppContext;
  render() {
    const { characterList, loading, filter } = this.context;
    const { sortCharactersBy } = this.props;
    let filteredCharacterList = [...characterList];
    if (filter !== 'all') {
      filteredCharacterList = characterList.filter(character => character.gender === filter);
    }
    return (
      <div id="characters">
        <p>Characters</p>
        {
          <React.Fragment>
            {loading ? (
              <p className="text--white">The force is searching ...</p>
            ) : (
              <React.Fragment>
                {verifyArray(filteredCharacterList) ? (
                  <React.Fragment>
                    <GenderFilter />
                    <table className="character-list-table">
                      <thead>
                        <tr>
                          <td onClick={() => sortCharactersBy('name')}>Name</td>
                          <td onClick={() => sortCharactersBy('gender')}>Gender</td>
                          <td onClick={() => sortCharactersBy('height', 'number')}>Height (cm)</td>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredCharacterList.map((character, index) => (
                          <tr key={index}>
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
                          <td colSpan={2} className="text--white">{`${filteredCharacterList.reduce(
                            getTotalHeight,
                            0,
                          )} cm (${
                            convertCentimetresToFeetPerInches(
                              filteredCharacterList.reduce(getTotalHeight, 0),
                            ).feet
                          } ft/${
                            convertCentimetresToFeetPerInches(
                              filteredCharacterList.reduce(getTotalHeight, 0),
                            ).inches
                          } inches)`}</td>
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
  }
}

export default CharacterList;
