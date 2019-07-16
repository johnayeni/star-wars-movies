import React from 'react';
import { determineGender } from 'utils';

const TableBody = ({ filteredCharacterList }) => (
  <tbody>
    {filteredCharacterList.map(character => (
      <tr key={character.id}>
        <td>{character.name}</td>
        <td>{determineGender(character.gender)}</td>
        <td>{character.height === 'unknown' ? 'N/A' : character.height}</td>
      </tr>
    ))}
  </tbody>
);

export default TableBody;
