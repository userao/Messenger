import { useDispatch } from 'react-redux';
import io from 'socket.io-client';
import { useTranslation } from 'react-i18next';
import { actions as messagesActions } from './slices/messagesSlice.js';
import { actions as channelsActions } from './slices/channelsSlice.js';
import { actions as modalActions } from './slices/modalSlice.js';
import useSocket from './hooks/useSocket.js';

export default async () => {
  console.log('aboba')
  const socket = io.connect();
  const context = useSocket();
  context.socket = socket;
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage' });

  socket.on('newMessage', (payload) => {
    dispatch(messagesActions.addMessage(payload));
    dispatch(messagesActions.setFetchingStatus('idle'));
  });

  socket.on('newChannel', (payload) => {
    dispatch(channelsActions.addChannel(payload));
    dispatch(channelsActions.setActiveChannel(payload.id));
    dispatch(modalActions.setDisplayedModal({ type: null }));
    // toast.success(t('toastifyChannelCreated'));
  });

  socket.on('renameChannel', (payload) => {
    dispatch(channelsActions.renameChannel(payload));
    dispatch(modalActions.setDisplayedModal({ type: null }));
    // toast.success(t('toastifyChannelRenamed'));
  });

  socket.on('removeChannel', (payload) => {
    dispatch(channelsActions.setActiveChannel(1));
    dispatch(channelsActions.removeChannel(payload.id));
    dispatch(modalActions.setDisplayedModal({ type: null }));
    // toast.success(t('toastifyChannelDeleted'));
  });

  socket.on('disconnect', () => {
    // toast.error(t('toastifyConnectionError'), { autoClose: false });
  });
};
