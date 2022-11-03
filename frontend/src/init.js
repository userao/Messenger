import { configureStore } from '@reduxjs/toolkit';
import { toast, ToastContainer } from 'react-toastify';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import channelsReducer, { actions as channelsActions } from './slices/channelsSlice.js';
import messagesReducer, { actions as messagesActions } from './slices/messagesSlice.js';
import modalReducer, { actions as modalActions } from './slices/modalSlice.js';
import socket from './socket.js';
import App from './components/App.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import i18n from './i18n.js';
import FilterProvider from './components/FilterProvider.jsx';
import AuthProvider from './components/AuthProvider.jsx';

const runApp = () => {
  const store = configureStore({
    reducer: {
      channels: channelsReducer,
      messages: messagesReducer,
      modal: modalReducer,
    },
  });
  socket.on('newChannel', (newChannel) => {
    store.dispatch(channelsActions.addChannel(newChannel));
    store.dispatch(channelsActions.setActiveChannel(newChannel.id));
    store.dispatch(modalActions.setDisplayedModal({ type: null }));
    toast.success(i18n.t('toastifyNotifications.channelCreated'));
  });
  socket.on('renameChannel', (renamedChannel) => {
    store.dispatch(channelsActions.renameChannel(renamedChannel));
    store.dispatch(modalActions.setDisplayedModal({ type: null }));
    toast.success(i18n.t('toastifyNotifications.channelRenamed'));
  });
  socket.on('removeChannel', (removedChannel) => {
    store.dispatch(channelsActions.setActiveChannel(1));
    store.dispatch(channelsActions.removeChannel(removedChannel.id));
    store.dispatch(modalActions.setDisplayedModal({ type: null }));
    toast.success(i18n.t('toastifyNotifications.channelRemoved'));
  });
  socket.on('newMessage', (newMessage) => {
    store.dispatch(messagesActions.addMessage(newMessage));
    store.dispatch(messagesActions.setFetchingStatus('idle'));
  });
  socket.on('disconnect', () => {
    toast.error(i18n.t('toastifyNotifications.connectionError'), { autoClose: false });
  });
  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(
    <Provider store={store}>
      <FilterProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </FilterProvider>
      <ToastContainer />
    </Provider>,
  );
};

// export default store;
export default runApp;
