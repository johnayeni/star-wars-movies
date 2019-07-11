import React from 'react';
import ReactLoader from 'react-loader-spinner';
import AppContext from 'context';

const Loader = () => (
  <AppContext.Consumer>
    {({ loadingText }) => (
      <React.Fragment>
        <ReactLoader type="RevolvingDot" color="#ffe545" height="80" width="80" />
        <p>{loadingText || ''}</p>
      </React.Fragment>
    )}
  </AppContext.Consumer>
);

export default Loader;
