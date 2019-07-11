import React from 'react';
import AppContext from 'context';

const GenderFilter = () => (
  <AppContext.Consumer>
    {({ onfilterChange, filter }) => (
      <div className="switch-field">
        <input type="radio" name="gender" value="all" id="all" checked={filter === 'all'} onChange={onfilterChange} />
        <label htmlFor="all">All</label>
        <input type="radio" name="gender" value="male" id="male" checked={filter === 'male'} onChange={onfilterChange} />
        <label htmlFor="male">Male</label>
        <input type="radio" name="gender" value="female" id="female" checked={filter === 'female'} onChange={onfilterChange} />
        <label htmlFor="female">Female</label>
        <input
          type="radio"
          name="gender"
          value="hermaphrodite"
          id="hermaphrodite"
          checked={filter === 'hermaphrodite'}
          onChange={onfilterChange}
        />
        <label htmlFor="hermaphrodite">Hermaphrodite</label>
      </div>
    )}
  </AppContext.Consumer>
);

export default GenderFilter;
