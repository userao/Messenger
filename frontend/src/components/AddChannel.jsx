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

const AddChannel = ({ handleClose }) => {
  const channelNameInput = useRef(null);
  useEffect(() => channelNameInput.current.focus());
  const channels = useSelector(channelsSelectors.selectAll);
  const [isChannelExists, setChannelExistence] = useState(null);
  const { socket } = useAuth();
  const inputClasses = cn('mb-2', { 'is-invalid': isChannelExists });

  const handleSubmit = (values) => {
    const { channelName } = values;
    const isExisting = !!channels.find((channel) => channel.name === channelName);

    setChannelExistence(isExisting);
    
    if (!isExisting) {
      socket.emit('newChannel', { name: channelName });
      handleClose();
    }
  };

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    onSubmit: (values) => handleSubmit(values),
  });


  return (
  <>
    <Modal.Header closeButton>
      <Modal.Title>Add channel</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <div>
          <Form.Group>
            <Form.Label visuallyHidden>New channel name</Form.Label>
            <Form.Control
              ref={channelNameInput}
              required
              id="channelName"
              name="channelName"
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
              Add
            </Button>
          </div>
        </div>
      </Form>
    </Modal.Body>
  </>
  )
};

export default AddChannel;