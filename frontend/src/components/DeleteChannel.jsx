import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth.js';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';

const RenameChannel = ({ handleClose }) => {
  const { socket } = useAuth();
  const modal = useSelector((state) => state.modal.displayedModal);
  const { t } = useTranslation('translation', { keyPrefix: 'deleteChannelModal' });

  const handleSubmit = () => {
    socket.emit('removeChannel', { id: modal.channelId });
    handleClose();
  };

  return (
  <>
    <Modal.Header closeButton>
      <Modal.Title>{t('header')}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="lead">{t('body')}</p>
      <div className="d-flex justify-content-end">
      <Button variant="secondary" onClick={handleClose} className="me-2">
          {t('closeButton')}
      </Button>
      <Button variant="danger" type="submit" onClick={handleSubmit}>
          {t('deleteButton')}
      </Button>
      </div>
    </Modal.Body>
  </>
  )
};

export default RenameChannel;