import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { actions as channelsActions } from '../slices/channelsSlice.js';
import i18n from '../i18n.js';

const RenameChannel = ({ handleClose }) => {
  const modal = useSelector((state) => state.modal.displayedModal);
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);

  const handleSubmit = () => {
    dispatch(channelsActions.emitRemoveChannel({ id: modal.channelId }));
    setSubmitting(true);
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('deleteChannelModal.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p className="lead">{i18n.t('deleteChannelModal.body')}</p>
        <div className="d-flex justify-content-end">
          <Button variant="secondary" onClick={handleClose} className="me-2" disabled={isSubmitting}>
            {i18n.t('deleteChannelModal.closeButton')}
          </Button>
          <Button variant="danger" type="submit" onClick={handleSubmit} disabled={isSubmitting}>
            {i18n.t('deleteChannelModal.deleteButton')}
          </Button>
        </div>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
