import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth.js';
import cn from 'classnames';

const RenameChannel = ({ handleClose }) => {
  const { socket } = useAuth();
  const modal = useSelector((state) => state.modal.displayedModal);

  const handleSubmit = () => {
    socket.emit('removeChannel', { id: modal.channelId });
    handleClose();
  };

  return (
  <>
    <Modal.Header closeButton>
      <Modal.Title>Delete channel</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p className="lead">Are you sure?</p>
      <div className="d-flex justify-content-end">
      <Button variant="secondary" onClick={handleClose} className="me-2">
          No
      </Button>
      <Button variant="danger" type="submit" onClick={handleSubmit}>
          Yes
      </Button>
      </div>
    </Modal.Body>
  </>
  )
};

export default RenameChannel;