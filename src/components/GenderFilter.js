import React from 'react';
import { isArrayAndHasContent, getUniqueGenders } from 'utils';

function GenderFilter({ onfilterChange, filter, characters }) {
  const uniqueGenders = getUniqueGenders(characters);
  const filters = ['all', ...uniqueGenders];
  return (
    <div className="switch-field">
      {isArrayAndHasContent(filters) && (
        <React.Fragment>
          <label>GENDER FILTER</label>
          {filters.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={index}>
              <input
                type="radio"
                name="gender"
                value={item}
                id={item}
                checked={filter === item}
                onChange={onfilterChange}
              />
              <label htmlFor={item}>{item}</label>
            </React.Fragment>
          ))}
        </React.Fragment>
      )}
    </div>
  );
}
export default GenderFilter;
