/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { NUMBER } from '../../../constants';

const TableHeader = ({ sortCharactersBy }) => (
  <thead>
    <tr>
      <td onClick={() => sortCharactersBy('name')}>Name</td>
      <td onClick={() => sortCharactersBy('gender')}>Gender</td>
      <td onClick={() => sortCharactersBy('height', NUMBER)}>Height (cm)</td>
    </tr>
  </thead>
);
export default TableHeader;
