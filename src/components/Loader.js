import React from 'react';
import ReactLoader from 'react-loader-spinner';
import AppContext from 'context';

class Loader extends React.PureComponent {
  static contextType = AppContext;

  render() {
    const { loadingText } = this.context;
    return (
      <React.Fragment>
        <ReactLoader type="RevolvingDot" color="#ffe545" height="80" width="80" />
        <p>{loadingText || ''}</p>
      </React.Fragment>
    );
  }
}

export default Loader;
