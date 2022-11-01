/* eslint-disable react/jsx-no-constructed-context-values */
import SocketContext from '../context/SocketContext.js';
import socket from '../socket.js';

const SocketProvider = ({ children }) => (
  <SocketContext.Provider value={{ socket }}>
    {children}
  </SocketContext.Provider>
);

export default SocketProvider;
