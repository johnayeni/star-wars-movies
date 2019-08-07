/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from 'react';
import { NUMBER } from '../../../constants';
import RowOrder from './RowOrder';

const TableHeader = ({ toggleKeyOrder, sortOrder: { name, gender, height } }) => (
  <thead>
    <tr>
      <td onClick={() => toggleKeyOrder('name')}>
        Name
        <RowOrder order={name} />
      </td>
      <td onClick={() => toggleKeyOrder('gender')}>
        Gender
        <RowOrder order={gender} />
      </td>
      <td onClick={() => toggleKeyOrder('height', NUMBER)}>
        Height (cm)
        <RowOrder order={height} />
      </td>
    </tr>
  </thead>
);
export default TableHeader;
