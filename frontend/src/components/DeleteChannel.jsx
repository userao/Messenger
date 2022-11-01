import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { actions as channelsActions } from '../slices/channelsSlice.js';

const RenameChannel = ({ handleClose }) => {
  const modal = useSelector((state) => state.modal.displayedModal);
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'deleteChannelModal' });

  const handleSubmit = () => {
    dispatch(channelsActions.emitRemoveChannel({ id: modal.channelId }));
    setSubmitting(true);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{t('header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{t('body')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2" disabled={isSubmitting}>
            {t('closeButton')}
          </Button>
          <Button variant="danger" type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {t('deleteButton')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
