import React from 'react';
import Modal from 'react-bootstrap/Modal';
import AddChannel from './AddChannel.jsx';
import RenameChannel from './RenameChannel.jsx';
import DeleteChannel from './DeleteChannel.jsx';
import { useDispatch } from 'react-redux';
import { actions as modalActions } from '../slices/modalSlice.js';


const ModalWindow = ({ displayedModal }) => {
  if (!displayedModal.type) return null;

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalActions.setDisplayedModal({ type: null }));
  };

  const modalTypes = {
    adding: AddChannel,
    renaming: RenameChannel,
    deleting: DeleteChannel,
  }

  const ModalWindow = modalTypes[displayedModal.type];

  return (
    <Modal centered show={true} onHide={handleClose}>
      <ModalWindow handleClose={handleClose} />
    </Modal>
  );
};

export default ModalWindow;