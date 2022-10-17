import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { Route } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {
  addChannel,
  setActiveChannel,
  fetchChannels,
  selectors as channelsSelectors
} from '../slices/channelsSlice.js'
import routes from '../routes.js';
import useAuth from '../hooks/useAuth.js';
import cn from 'classnames';

const getAuthHeader = () => {
  const userId = JSON.parse(localStorage.getItem('userId'));

  if (userId && userId.token) {
    return { Authorization: `Bearer ${userId.token}` };
  }

  return {};
};

const getChannelsListElement = (channel, dispatch) => {
  const itemClasses = cn('w-100', 'rounded-0', 'text-start', 'btn', { 'btn-secondary': channel.active });
  return (
    <li key={channel.id} className="nav-item w-100">
      <button onClick={() => dispatch(setActiveChannel(channel.id))} className={itemClasses} type="button">
        <span className="me-1">#</span>
        {channel.name}
      </button>
    </li>
  );
};

const Home = () => {
  const headers = getAuthHeader();
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchChannels(headers));
  });

  const userChannels = useSelector(channelsSelectors.selectAll);
  const activeChannel = userChannels.find((channel) => channel.active);
  console.log(userChannels)

  return  (userChannels.length > 0 &&
      <div className="container h-100 my-4 overflow-hidden rounded shadow">
        <div className="row h-100 bg-white flex-md-row">
          <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
            <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
              <span>Channels</span>
              <button type="button" className="p-0 text-primary btn btn-group-vertical"></button>
            </div>
            <ul className="nav flex-column nav-pills nav-fill px-2">
              {userChannels.map((channel) => getChannelsListElement(channel, dispatch))}
            </ul>
          </div>
          <div className="col p-0 h-100">
            <div className="d-flex flex-column h-100">
              <div className="bg-light mb-4 p-3 shadow-sm small">
                <p className="m-0"><b># {activeChannel.name}</b></p>
                <span className="text-muted">*MSGS COUNT*</span>
              </div>
              <div className="chat-messages overflow-auto px-5" id="message-box"></div>
              <div className="mt-auto px-5 py-3">
                <Form noValidate className="py-1 border rounded-2">
                  <div className="input-group has-validation">
                    <Form.Control
                      className="border-0 p-0 ps-2 form-control"
                      name="body"
                      aria-label="New message"
                      placeholder="Type your message..."
                    />
                    <Button type="submit" disabled={true} className="btn btn-group-vertical" />
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
