import React from 'react';
import filter from 'leo-profanity';
import FilterContext from '../context/FilterContext.js';

const FilterProvider = ({ children }) => {
  filter.loadDictionary('ru');
  return (
    <FilterContext.Provider value={filter}>
      {children}
    </FilterContext.Provider>
  );
};

export default FilterProvider;
