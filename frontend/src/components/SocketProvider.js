/* eslint-disable react/jsx-no-constructed-context-values */
import io from 'socket.io-client';
import SocketContext from '../context/SocketContext.js';

const SocketProvider = ({ children }) => {
  const socket = io.connect();

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};

export default SocketProvider;
