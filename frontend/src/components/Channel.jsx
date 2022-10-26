import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Button from 'react-bootstrap/Button';
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import { useDispatch } from 'react-redux';
import filter from 'leo-profanity';
import { useTranslation } from 'react-i18next';
import { actions as modalActions } from '../slices/modalSlice';

filter.loadDictionary('ru');

const RegularButton = ({ channel, variant, handleSelect }) => (
  <Button onClick={() => handleSelect(channel.id)} variant={variant} className="w-100 rounded-0 text-start">
    <span className="me-1">#</span>
    {filter.clean(channel.name)}
  </Button>
);

const DropdownButton = ({
  channel,
  variant,
  handleSelect,
  translate,
  dispatch,
}) => (
  <Dropdown as={ButtonGroup} className="d-flex">
    <Button onClick={() => handleSelect(channel.id)} variant={variant} className="w-100 rounded-0 text-start text-truncate">
      <span className="me-1">#</span>
      {filter.clean(channel.name)}
    </Button>

    <Dropdown.Toggle split variant={variant} id="dropdown-split-basic" className="flex-grow-0">
      <span className="visually-hidden">{translate('channelControlSpan')}</span>
    </Dropdown.Toggle>

    <Dropdown.Menu>
      <Dropdown.Item onClick={() => dispatch(modalActions.setDisplayedModal({ type: 'renaming', channelId: channel.id }))}>
        Rename
        <span className="visually-hidden">{translate('renameButtonSpan')}</span>
      </Dropdown.Item>
      <Dropdown.Item onClick={() => dispatch(modalActions.setDisplayedModal({ type: 'deleting', channelId: channel.id }))}>
        Delete
        <span className="visually-hidden">{translate('deleteButtonSpan')}</span>
      </Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
);

const Channel = ({ channel, handleSelect }) => {
  const variant = channel.active ? 'secondary' : 'light';
  const { removable } = channel;
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage' });

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
        translate={t}
        dispatch={dispatch}
      />
    </Nav.Item>
  );
};

export default Channel;
