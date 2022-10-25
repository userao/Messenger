import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import useAuth from '../hooks/useAuth.js';

const RenameChannel = ({ handleClose }) => {
  const { socket } = useAuth();
  const modal = useSelector((state) => state.modal.displayedModal);
  const [isDisabled, setDisabled] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'deleteChannelModal' });

  const handleSubmit = () => {
    socket.emit('removeChannel', { id: modal.channelId });
    setDisabled(true);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('body')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2" disabled={isDisabled}>
            {t('closeButton')}
          </Button>
          <Button variant="danger" type="submit" onClick={handleSubmit} disabled={isDisabled}>
            {t('deleteButton')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
