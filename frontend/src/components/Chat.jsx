import axios from 'axios';
import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
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
  const { getAuthHeader } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const headers = getAuthHeader();
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
    </div>
  )
  );
};

export default Chat;
