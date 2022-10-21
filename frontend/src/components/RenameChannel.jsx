import React from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import { useFormik } from 'formik';
import { useRef, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import useAuth from '../hooks/useAuth.js';
import cn from 'classnames';

const RenameChannel = ({ handleClose }) => {
  const channelNameInput = useRef(null);
  useEffect(() => channelNameInput.current.focus());
  const channels = useSelector(channelsSelectors.selectAll);
  const [isChannelExists, setChannelExistence] = useState(null);
  const { socket } = useAuth();
  const inputClasses = cn('mb-2', { 'is-invalid': isChannelExists });
  const modal = useSelector((state) => state.modal.displayedModal);

  const handleSubmit = (values) => {
    const { newName } = values;
    const isExisting = !!channels.find((channel) => channel.name === newName);

    setChannelExistence(isExisting);
    
    if (!isExisting) {
      socket.emit('renameChannel', { id: modal.channelId, name: newName });
      handleClose();
    }
  };

  const formik = useFormik({
    initialValues: {
      newName: '',
    },
    onSubmit: (values) => handleSubmit(values),
  });


  return (
  <>
    <Modal.Header closeButton>
      <Modal.Title>Rename channel</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <div>
          <Form.Group>
            <Form.Label visuallyHidden>New name</Form.Label>
            <Form.Control
              ref={channelNameInput}
              required
              id="newName"
              name="newName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              className={inputClasses}
            />
            {isChannelExists 
              ? <div className="invalid-feedback">Channel name must be unique</div>
              : null}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Close
            </Button>
            <Button variant="primary" type="submit">
              Rename
            </Button>
          </div>
        </div>
      </Form>
    </Modal.Body>
  </>
  )
};

export default RenameChannel;