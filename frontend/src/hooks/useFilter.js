import { useContext } from 'react';

import FilterContext from '../context/FilterContext.js';

const useFilter = () => useContext(FilterContext);

export default useFilter;
