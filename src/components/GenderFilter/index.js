import React from 'react';
import AppContext from 'context';
import { GENDERS } from '../../constants';

const GenderFilter = () => {
  const genders = ['all', ...Object.keys(GENDERS)];
  return (
    <AppContext.Consumer>
      {({ onfilterChange, filter }) => (
        <div className="switch-field">
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
};
export default GenderFilter;
