import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { actions as modalActions } from '../slices/modalSlice';
import { useDispatch } from 'react-redux';

const Channel = ({ channel, handleSelect }) => {
  const variant = channel.active ? 'secondary' : 'light';
  const { removable } = channel;
  const dispatch = useDispatch()

  const buttonTypes = {
    true: () => (
      <Dropdown as={ButtonGroup} className="d-flex">
        <Button onClick={() => handleSelect(channel.id)} variant={variant} className="w-100 rounded-0 text-start text-truncate">
          <span className="me-1">#</span>
          {channel.name}
        </Button>

        <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" className="flex-grow-0"/>

        <Dropdown.Menu>
          <Dropdown.Item onClick={() => setDisplayedModal({ type: 'renaming', channelId: channel.id })}>Rename</Dropdown.Item>
          <Dropdown.Item onClick={() => setDisplayedModal({ type: 'deleting', channelId: channel.id })}>Delete</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
    ),
    false: () => (
      <Button onClick={() => handleSelect(channel.id)} variant={variant} className='w-100 rounded-0 text-start'>
          <span className="me-1">#</span>
          {channel.name}
        </Button>
    ),
  }

  const setDisplayedModal = (modalType) => {
    dispatch(modalActions.setDisplayedModal(modalType));
  };
  
  const ChannelButton = buttonTypes[removable];
  
  return (
    <Nav.Item className="w-100">
      <ChannelButton />
    </Nav.Item>
  );
};

export default Channel;