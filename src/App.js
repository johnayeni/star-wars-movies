import React from 'react';
import DataWrapper from 'components/DataWrapper';
import Root from 'components/Root';
import AppContext from 'context';

const App = () => (
  <DataWrapper
    render={contextData => (
      <AppContext.Provider value={contextData}>
        <Root />
      </AppContext.Provider>
    )}
  />
);

export default App;
