import React from 'react';
import { getTotalHeightOfCharacters, convertCentimetresToFeetPerInches } from 'utils';

function TableFooter({ characters }) {
  const charactersTotalHeight = getTotalHeightOfCharacters(characters);
  const heightInFeetPerInches = convertCentimetresToFeetPerInches(charactersTotalHeight);
  const noOfCharacters = characters.length;
  return (
    <tfoot>
      <tr>
        <td>No. of characters</td>
        <td colSpan={2} className="text--white">
          {noOfCharacters}
        </td>
      </tr>
      <tr>
        <td>Total height sum</td>
        <td colSpan={2} className="text--white">
          {`${charactersTotalHeight} cm (${heightInFeetPerInches})`}
        </td>
      </tr>
    </tfoot>
  );
}

export default TableFooter;
