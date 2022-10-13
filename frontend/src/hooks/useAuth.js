import { useContext } from 'react';

import authContext from '../context/AuthContext.js';

const useAuth = () => useContext(authContext);

export default useAuth;