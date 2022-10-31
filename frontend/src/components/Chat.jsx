import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import {
  actions as channelsActions,
  selectors as channelsSelectors,
} from '../slices/channelsSlice.js';
import {
  actions as messagesActions,
} from '../slices/messagesSlice.js';
import { actions as modalActions } from '../slices/modalSlice.js';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';
import 'react-toastify/dist/ReactToastify.css';
import ChannelsCollumn from './ChannelsCollumn.jsx';
import ChatBox from './ChatBox.jsx';

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const getNormalized = (data) => {
  const channels = data.channels.map((channel) => {
    const active = channel.id === data.currentChannelId;
    return { ...channel, active };
  });
  const { messages } = data;
  return { channels, messages };
};

const Chat = () => {
  const userChannels = useSelector(channelsSelectors.selectAll);
  const { socket } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage' });

  // useEffect(() => {
  //   socket.on('newMessage', (payload) => {
  //     dispatch(messagesActions.addMessage(payload));
  //     dispatch(messagesActions.setFetchingStatus('idle'));
  //   });

  //   socket.on('newChannel', (payload) => {
  //     dispatch(channelsActions.addChannel(payload));
  //     dispatch(channelsActions.setActiveChannel(payload.id));
  //     dispatch(modalActions.setDisplayedModal({ type: null }));
  //     toast.success(t('toastifyChannelCreated'));
  //   });

  //   socket.on('renameChannel', (payload) => {
  //     dispatch(channelsActions.renameChannel(payload));
  //     dispatch(modalActions.setDisplayedModal({ type: null }));
  //     toast.success(t('toastifyChannelRenamed'));
  //   });

  //   socket.on('removeChannel', (payload) => {
  //     dispatch(channelsActions.setActiveChannel(1));
  //     dispatch(channelsActions.removeChannel(payload.id));
  //     dispatch(modalActions.setDisplayedModal({ type: null }));
  //     toast.success(t('toastifyChannelDeleted'));
  //   });

  //   socket.on('disconnect', () => {
  //     toast.error(t('toastifyConnectionError'), { autoClose: false });
  //   });
  // }, [socket]);

  useEffect(() => {
    const headers = getAuthHeader();

    const fetchData = async () => {
      const { data } = await axios.get(routes.getData(), { headers });
      const { channels, messages } = getNormalized(data);

      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
    };

    fetchData();
  }, []);

  return (userChannels.length > 0 && (
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <ChannelsCollumn channels={userChannels} />
        <ChatBox />
      </div>
      <ToastContainer />
    </div>
  )
  );
};

export default Chat;
