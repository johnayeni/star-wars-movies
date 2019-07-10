import React from 'react';
import AppContext from 'context';

const determineGender = value => {
  const genders = { hermaphrodite: 'H', male: 'M', female: 'F' };
  return genders[value.toLowerCase()] || 'N/A';
};

class CharacterList extends React.PureComponent {
  static contextType = AppContext;
  render() {
    const { characterList } = this.context;
    const { sortCharactersBy } = this.props;
    return (
      <div id="characters">
        <p>Characters</p>
        {Array.isArray(characterList) && characterList.length > 0 ? (
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
            {/* <tfoot>
                <tr>
                  <td>170 cm (5ft/6.93in)</td>
                </tr>
              </tfoot> */}
          </table>
        ) : (
          <p style={{ color: '#ffffff' }}>No characters available</p>
        )}
      </div>
    );
  }
}

export default CharacterList;
