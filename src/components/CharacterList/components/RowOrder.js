import React from 'react';
import { DESCENDING_ORDER, ASCENDING_ORDER } from '../../../constants';

const RowOrder = ({ order }) => (
  <div className="order-icon">
    {order === ASCENDING_ORDER && (
      <span role="img" aria-label="arrow up">
        🔼
      </span>
    )}
    {order === DESCENDING_ORDER && (
      <span role="img" aria-label="arrow down">
        🔽
      </span>
    )}
  </div>
);

export default RowOrder;
