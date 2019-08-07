import React from 'react';

const Msg = ({ type, message }) => (
  <div className={`msg ${type}`}>
    <p>{message}</p>
  </div>
);

export default Msg;
