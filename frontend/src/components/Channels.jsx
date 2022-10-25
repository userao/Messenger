import React from 'react';
import Nav from 'react-bootstrap/Nav';
import { useDispatch } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice';
import Channel from './Channel.jsx';

const Channels = ({ channels }) => {
  const dispatch = useDispatch();

  const handleSelect = (id) => {
    dispatch(channelsActions.setActiveChannel(id));
  };

  return (
    <Nav variant="pills" activeKey="1" className="flex-column px-2">
      {channels.map((channel) => (
        <Channel key={channel.id} channel={channel} handleSelect={handleSelect} />
      ))}
    </Nav>
  );
};

export default Channels;
