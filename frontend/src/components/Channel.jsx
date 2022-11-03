import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import { actions as modalActions } from '../slices/modalSlice';
import useFilter from '../hooks/useFilter.js';
import i18n from '../i18n.js';

const RegularButton = ({
  channel,
  variant,
  handleSelect,
  filter,
}) => (
  <Button onClick={() => handleSelect(channel.id)} variant={variant} className="w-100 rounded-0 text-start">
    <span className="me-1">#</span>
    {filter.clean(channel.name)}
  </Button>
);

const DropdownButton = ({
  channel,
  variant,
  handleSelect,
  filter,
  dispatch,
}) => (
  <Dropdown as={ButtonGroup} className="d-flex">
    <Button onClick={() => handleSelect(channel.id)} variant={variant} className="w-100 rounded-0 text-start text-truncate">
      <span className="me-1">#</span>
      {filter.clean(channel.name)}
    </Button>

    <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" className="flex-grow-0">
      <span className="visually-hidden">{i18n.t('chatPage.channelControlSpan')}</span>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={() => dispatch(modalActions.setDisplayedModal({ type: 'renaming', channelId: channel.id }))}>
        {i18n.t('chatPage.renameButton')}
        <span className="visually-hidden">{i18n.t('chatPage.renameButton')}</span>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => dispatch(modalActions.setDisplayedModal({ type: 'deleting', channelId: channel.id }))}>
        {i18n.t('chatPage.deleteButton')}
        <span className="visually-hidden">{i18n.t('chatPage.deleteButton')}</span>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const Channel = ({ channel, handleSelect }) => {
  const filter = useFilter();
  const variant = channel.active ? 'secondary' : 'light';
  const { removable } = channel;
  const dispatch = useDispatch();

  const buttonTypes = {
    true: DropdownButton,
    false: RegularButton,
  };

  const ChannelButton = buttonTypes[removable];

  return (
    <Nav.Item className="w-100">
      <ChannelButton
        channel={channel}
        variant={variant}
        handleSelect={handleSelect}
        filter={filter}
        dispatch={dispatch}
      />
    </Nav.Item>
  );
};

export default Channel;
