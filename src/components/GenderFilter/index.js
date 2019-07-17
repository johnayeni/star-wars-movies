import React from 'react';
import AppContext from 'context';

const GenderFilter = () => (
  <AppContext.Consumer>
    {({ onfilterChange, filter, characters: { genders } }) => (
      <div className="switch-field">
        <p className="text--white">Gender Filter</p>
        {genders.map((gender, index) => (
          // eslint-disable-next-line react/no-array-index-key
          <React.Fragment key={index}>
            <input
              type="radio"
              name="gender"
              value={gender}
              id={gender}
              checked={filter === gender}
              onChange={onfilterChange}
            />
            <label htmlFor={gender}>{gender}</label>
          </React.Fragment>
        ))}
      </div>
    )}
  </AppContext.Consumer>
);
export default GenderFilter;
