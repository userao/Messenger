import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  actions as channelsActions,
  selectors as channelsSelectors
} from '../slices/channelsSlice.js'
import {
  actions as messagesActions,
  selectors as messagesSelectors
} from '../slices/messagesSlice.js'
import { actions as modalActions } from '../slices/modalSlice.js';
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';
import cn from 'classnames';
import { useFormik } from 'formik';
import Channels from './Channels.jsx';

// TODO переделать кнопку для удаляемых каналов, добавить модалку для удаления

const getAuthHeader = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.token) {
    return { Authorization: `Bearer ${user.token}` };
  }

  return {};
};

const getUsername = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.name) {
    return user.name;
  }

  return null;
}

const getNormalized = (data) => {
  const channels = data.channels.map((channel) => {
    const active = channel.id === data.currentChannelId;
    return { ...channel, active };
  });
  const messages = data.messages;
  return { channels, messages };
}

const renderMessage = (message) => {
  return (
    <div key={message.id} className="text-break mb-2">
      <b>{message.username}</b>: {message.body}
    </div>
  )
}

const Home = () => {
  const { socket } = useAuth();
  const headers = getAuthHeader();
  const dispatch = useDispatch();
  const messageInput = useRef(null);
  const form = useRef(null);
  const userChannels = useSelector(channelsSelectors.selectAll);
  const activeChannel = userChannels.find((channel) => channel.active);
  const channelMessages = useSelector(messagesSelectors.selectAll)
    .filter((message) => message.channelId === activeChannel.id);
  const username = getUsername();
  const [sendButtonDisabled, setSendButtonDisabled] = useState(false);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => handleSubmit(values),
  });

  const handleSubmit = (values) => {
    const text = values.body;
    socket.emit('newMessage', { body: text, channelId: activeChannel.id, username });
    formik.values.body = '';
    setSendButtonDisabled(true);
  }

  const setDisplayedModal = (type) => {
    dispatch(modalActions.setDisplayedModal(type));
  };
 
  useEffect(() => {
    socket.on('newMessage', (payload) => {
      dispatch(messagesActions.addMessage(payload));
      setSendButtonDisabled(false);
    });

    socket.on('newChannel', (payload) => {
      dispatch(channelsActions.addChannel(payload));
      dispatch(channelsActions.setActiveChannel(payload.id));
    });

    socket.on('renameChannel', (payload) => {
      console.log('renaming channel')
      dispatch(channelsActions.renameChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(channelsActions.setActiveChannel(1));
      dispatch(channelsActions.removeChannel(payload.id));
    });
  }, [socket]);


  useEffect(() => {
    const fetchData = async () => {
      const { data } = await axios.get(routes.getData(), { headers });
      const { channels, messages } = getNormalized(data);

      dispatch(channelsActions.addChannels(channels));
      dispatch(messagesActions.addMessages(messages));
    };
    
    fetchData();
    if (messageInput.current) {
      messageInput.current.focus();
    };
  }, []);
  
  return  (activeChannel && 
    <div className="container h-100 my-4 overflow-hidden rounded shadow">
      <div className="row h-100 bg-white flex-md-row">
        <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
          <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
            <span>Channels</span>
            <Button
              variant="outline-primary"
              className="p-0 text-primary"
              onClick={() => setDisplayedModal({ type: 'adding' })}
            > + </Button>
          </div>
          <Channels channels={userChannels} />
        </div>
        <div className="col p-0 h-100">
          <div className="d-flex flex-column h-100">
            <div className="bg-light mb-4 p-3 shadow-sm small">
              <p className="m-0"><b># {activeChannel.name}</b></p>
              <span className="text-muted">{channelMessages.length}</span>
            </div>
            <div className="chat-messages overflow-auto px-5" id="message-box">
              {channelMessages.map((message) => renderMessage(message))}
            </div>
            <div className="mt-auto px-5 py-3">
              <Form onSubmit={formik.handleSubmit} ref={form}  noValidate className="py-1 border rounded-2">
                <div className="input-group has-validation">
                  <Form.Control
                    ref={messageInput}
                    onChange={formik.handleChange}
                    value={formik.values.body}
                    className="border-0 p-0 ps-2 form-control"
                    name="body"
                    aria-label="New message"
                    placeholder="Type your message..."
                    autoComplete="off"
                  />
                  <Button
                    type="submit"
                    disabled={sendButtonDisabled}
                    className="btn btn-group-vertical"
                  />
                </div>
              </Form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;
