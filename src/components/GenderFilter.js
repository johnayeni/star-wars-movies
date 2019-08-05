import React from 'react';
import AppContext from 'context';
import { verifyArray } from 'utils';

const GenderFilter = () => (
  <AppContext.Consumer>
    {({ onfilterChange, filter, genders }) => (
      <div className="switch-field">
        {verifyArray(genders) && (
          <React.Fragment>
            <label>GENDER FILTER</label>
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
          </React.Fragment>
        )}
      </div>
    )}
  </AppContext.Consumer>
);
export default GenderFilter;
