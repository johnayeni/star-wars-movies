import React from 'react';
import AppContext from 'context';

const Loader = () => (
  <AppContext.Consumer>
    {({ loadingText }) => (
      <React.Fragment>
        <div className="loader" />
        <p>{loadingText || ''}</p>
      </React.Fragment>
    )}
  </AppContext.Consumer>
);

export default Loader;
