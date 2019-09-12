import React from 'react';

const TableFooter = ({ noOfCharacters, charactersTotalHeight, heightInFeetPerInches }) => (
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

export default TableFooter;
