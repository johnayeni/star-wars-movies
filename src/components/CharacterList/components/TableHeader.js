/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { NUMBER } from '../../../constants';

const TableHeader = ({ sortCharacters }) => (
  <thead>
    <tr>
      <td onClick={() => sortCharacters('name')}>Name</td>
      <td onClick={() => sortCharacters('gender')}>Gender</td>
      <td onClick={() => sortCharacters('height', NUMBER)}>Height (cm)</td>
    </tr>
  </thead>
);
export default TableHeader;
