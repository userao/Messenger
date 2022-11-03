import React, { useEffect, useRef } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  actions as messagesActions,
  selectors as messagesSelectors,
} from '../slices/messagesSlice';
import { selectors as channelsSelectors } from '../slices/channelsSlice';
import Messages from './Messages';
import i18n from '../i18n.js';

const getUsername = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user && user.name) {
    return user.name;
  }

  return null;
};

const ChatBox = () => {
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
      dispatch(messagesActions
        .emitNewMessage({ body: text, channelId: activeChannel.id, username }));
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
          <span className="text-muted">{i18n.t('chatPage.messagesCounter', { counter: activeChannelMessages.length })}</span>
        </div>

        <Messages messages={activeChannelMessages} />

        <div className="mt-auto px-5 py-3">
          <Form onSubmit={formik.handleSubmit} noValidate className="py-1 border rounded-2">
            <div className="input-group">
              <Form.Control
                ref={messageInput}
                onChange={formik.handleChange}
                value={formik.values.body}
                className="border-0 p-0 ps-2"
                name="body"
                aria-label={i18n.t('chatPage.ariaLabel')}
                placeholder={i18n.t('chatPage.messagesInputPlaceholder')}
                autoComplete="off"
              />
              <Button
                type="submit"
                variant="outline-light"
                disabled={fetchingStatus === 'sending' || !formik.values.body.trim().length}
                className="btn-group-vertical"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="black"
                  className="bi bi-arrow-right-square"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 2a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2zM0 2a2 2 0 0 1 2-2h12a2 2
                      0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm4.5 5.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0
                      .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z"
                  />
                </svg>
                <span className="visually-hidden">{i18n.t('chatPage.sendMessageSpan')}</span>
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
