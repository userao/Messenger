import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import filter from 'leo-profanity';
import {
  actions as messagesActions,
  selectors as messagesSelectors,
} from '../slices/messagesSlice';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import useAuth from '../hooks/useAuth';
import Messages from './Messages';

filter.loadDictionary('ru');

const getUsername = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.name) {
    return user.name;
  }

  return null;
};

const ChatBox = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage' });
  const { socket } = useAuth();
  const dispatch = useDispatch();
  const messageInput = useRef(null);
  useEffect(() => messageInput.current.focus());
  const channels = useSelector(channelsSelectors.selectAll);
  const activeChannel = channels.find((channel) => channel.active);
  const username = getUsername();
  const fetchingStatus = useSelector((state) => state.messages.fetchingStatus);
  const activeChannelMessages = useSelector(messagesSelectors.selectAll)
    .filter((message) => message.channelId === activeChannel.id);

  const formik = useFormik({
    initialValues: {
      body: '',
    },
    onSubmit: (values) => {
      const text = values.body;
      socket.emit('newMessage', { body: text, channelId: activeChannel.id, username });
      dispatch(messagesActions.setFetchingStatus('sending'));
      formik.values.body = '';
    },
  });

  return (
    <div className="col p-0 h-100">
      <div className="d-flex flex-column h-100">
        <div className="bg-light mb-4 p-3 shadow-sm small">
          <p className="m-0">
            <b>
              #
              {' '}
              {activeChannel.name}
            </b>
          </p>
          <span className="text-muted">{t('messagesCounter', { counter: activeChannelMessages.length })}</span>
        </div>

        <Messages messages={activeChannelMessages} />

        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
            <div className="input-group has-validation">
              <Form.Control
                ref={messageInput}
                onChange={formik.handleChange}
                value={formik.values.body}
                className="border-0 p-0 ps-2"
                name="body"
                aria-label="New message"
                placeholder={t('messagesInputPlaceholder')}
                autoComplete="off"
              />
              <Button
                type="submit"
                disabled={fetchingStatus === 'sending' || !formik.values.body.trim().length}
                className="btn-group-vertical"
              />
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
