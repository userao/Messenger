import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { useDispatch } from 'react-redux';
import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import DeleteChannel from './DeleteChannel.jsx';
import { actions as modalActions } from '../slices/modalSlice.js';

const ModalWindow = ({ displayedModal }) => {
  const dispatch = useDispatch();

  if (!displayedModal.type) return null;

  const handleClose = () => {
    dispatch(modalActions.setDisplayedModal({ type: null }));
  };

  const modalTypes = {
    adding: AddChannel,
    renaming: RenameChannel,
    deleting: DeleteChannel,
  };

  const Window = modalTypes[displayedModal.type];

  return (
    <Modal centered show onHide={handleClose}>
      <Window handleClose={handleClose} />
    </Modal>
  );
};

export default ModalWindow;
