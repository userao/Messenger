import { configureStore, createListenerMiddleware } from '@reduxjs/toolkit';
import channelsReducer, { actions as channelsActions } from './slices/channelsSlice.js';
import messagesReducer, { actions as messagesActions } from './slices/messagesSlice.js';
import modalReducer, { actions as modalActions } from './slices/modalSlice.js';
import socket from './socket.js';

const listenerMiddleware = createListenerMiddleware();
listenerMiddleware.startListening({
  actionCreator: messagesActions.emitNewMessage,
  effect: (action, listenerApi) => {
    socket.on('newMessage', (newMessage) => {
      listenerApi.dispatch(messagesActions.addMessage(newMessage));
      listenerApi.dispatch(messagesActions.setFetchingStatus('idle'));
    });
  },
});
listenerMiddleware.startListening({
  actionCreator: channelsActions.emitNewChannel,
  effect: (action, listenerApi) => {
    socket.on('newChannel', (newChannel) => {
      listenerApi.dispatch(channelsActions.addChannel(newChannel));
      listenerApi.dispatch(channelsActions.setActiveChannel(newChannel.id));
      listenerApi.dispatch(modalActions.setDisplayedModal({ type: null }));
    });
  },
});
listenerMiddleware.startListening({
  actionCreator: channelsActions.emitRenameChannel,
  effect: (action, listenerApi) => {
    socket.on('renameChannel', (renamedChannel) => {
      listenerApi.dispatch(channelsActions.renameChannel(renamedChannel));
      listenerApi.dispatch(modalActions.setDisplayedModal({ type: null }));
    });
  },
});
listenerMiddleware.startListening({
  actionCreator: channelsActions.emitRemoveChannel,
  effect: (action, listenerApi) => {
    socket.on('removeChannel', (removedChannel) => {
      listenerApi.dispatch(channelsActions.setActiveChannel(1));
      listenerApi.dispatch(channelsActions.removeChannel(removedChannel.id));
      listenerApi.dispatch(modalActions.setDisplayedModal({ type: null }));
    });
  },
});
const store = configureStore({
  reducer: {
    channels: channelsReducer,
    messages: messagesReducer,
    modal: modalReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
    .prepend(listenerMiddleware.middleware),
});

export default store;
