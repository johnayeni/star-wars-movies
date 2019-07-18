/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { NUMBER } from '../../../constants';

const TableHeader = ({ toggleKeyOrder }) => (
  <thead>
    <tr>
      <td onClick={() => toggleKeyOrder('name')}>Name</td>
      <td onClick={() => toggleKeyOrder('gender')}>Gender</td>
      <td onClick={() => toggleKeyOrder('height', NUMBER)}>Height (cm)</td>
    </tr>
  </thead>
);
export default TableHeader;
