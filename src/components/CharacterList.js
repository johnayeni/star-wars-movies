import React from 'react';
import AppContext from 'context';
import {
  determineGender,
  verifyArray,
  getTotalHeight,
  convertCentimetresToFeetPerInches,
} from 'utils';

class CharacterList extends React.PureComponent {
  static contextType = AppContext;
  render() {
    const { characterList } = this.context;
    const { sortCharactersBy } = this.props;
    return (
      <div id="characters">
        <p>Characters</p>
        {verifyArray(characterList) ? (
          <table className="character-list-table">
            <thead>
              <tr>
                <td onClick={() => sortCharactersBy('name')}>Name</td>
                <td onClick={() => sortCharactersBy('gender')}>Gender</td>
                <td onClick={() => sortCharactersBy('height', 'number')}>Height (cm)</td>
              </tr>
            </thead>
            <tbody>
              {characterList.map((character, index) => (
                <tr key={index}>
                  <td>{character.name}</td>
                  <td>{determineGender(character.gender)}</td>
                  <td>{character.height}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>No. of characters</td>
                <td>{characterList.length}</td>
              </tr>
              <tr>
                <td>Total height sum</td>
                <td>{`${characterList.reduce(getTotalHeight)} cm (${
                  convertCentimetresToFeetPerInches(characterList.reduce(getTotalHeight)).feet
                }ft/${
                  convertCentimetresToFeetPerInches(characterList.reduce(getTotalHeight)).inches
                }in)`}</td>
              </tr>
            </tfoot>
          </table>
        ) : (
          <p style={{ color: '#ffffff' }}>No characters available</p>
        )}
      </div>
    );
  }
}

export default CharacterList;
