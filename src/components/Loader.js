import React, { useContext } from 'react';
import AppContext from 'context';

function Loader() {
  const { loadingText } = useContext(AppContext);
  return (
    <React.Fragment>
      <div className="loader" />
      <p>{loadingText || ''}</p>
    </React.Fragment>
  );
}

export default Loader;
