import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import AddChannel from './AddChannel.jsx';
import RenameChannel from './AddChannel.jsx';
import DeleteChannel from './AddChannel.jsx';
import { useDispatch } from 'react-redux';
import { actions as modalActions } from '../slices/modalSlice.js';


const ModalWindow = ({ modalType }) => {
  if (!modalType) return null;

  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(modalActions.setDisplayedModal(null));
  };

  const modalTypes = {
    adding: AddChannel,
    renaming: RenameChannel,
    deleting: DeleteChannel,
  }

  const ModalWindow = modalTypes[modalType];

  return (
    <Modal centered show={true} onHide={handleClose}>
      <ModalWindow handleClose={handleClose} />
    </Modal>
  );
};

export default ModalWindow;