import React from 'react';

const TableBody = ({ filteredCharacterList }) => (
  <tbody>
    {filteredCharacterList.map(character => (
      <tr key={character.id}>
        <td>{character.name}</td>
        <td>{character.gender}</td>
        <td>{character.height === 'unknown' ? 'n/a' : character.height}</td>
      </tr>
    ))}
  </tbody>
);

export default TableBody;
