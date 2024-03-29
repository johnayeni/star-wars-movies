import React from 'react';

function TableBody({ characters }) {
  return (
    <tbody>
      {characters.map((character, key) => (
        // eslint-disable-next-line react/no-array-index-key
        <tr key={key}>
          <td>{character.name}</td>
          <td>{character.gender}</td>
          <td>{character.height === 'unknown' ? 'n/a' : character.height}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
