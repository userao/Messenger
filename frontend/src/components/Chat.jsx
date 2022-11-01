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
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';
import 'react-toastify/dist/ReactToastify.css';
import ChannelsCollumn from './ChannelsCollumn.jsx';
import ChatBox from './ChatBox.jsx';
import useSocket from '../hooks/useSocket.js';

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
  const { socket } = useSocket();
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage' });
  useEffect(() => {
    socket.on('disconnect', () => {
      toast.error(t('toastifyConnectionError'), { autoClose: false });
    });
  }, [socket]);

  useEffect(async () => {
    const headers = getAuthHeader();

    const fetchData = async () => {
      const { data } = await axios.get(routes.getData(), { headers });
      return getNormalized(data);
    };

    const { channels, messages } = await fetchData();
    dispatch(channelsActions.addChannels(channels));
    dispatch(messagesActions.addMessages(messages));
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
