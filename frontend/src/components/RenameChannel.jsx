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
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';

const RenameChannel = ({ handleClose }) => {
  const channelNameInput = useRef(null);
  useEffect(() => channelNameInput.current.focus());
  const modal = useSelector((state) => state.modal.displayedModal);
  const channels = useSelector(channelsSelectors.selectAll);
  const { socket } = useAuth();
  
  const [isDisabled, setDisabled] = useState(false);
  const { t } = useTranslation('translation', { keyPrefix: 'renameChannelModal' });

  const handleSubmit = (values) => {
    const { newName } = values;
      socket.emit('renameChannel', { name: newName.trim(), id: modal.channelId });
      setDisabled(true);
  };

  const formik = useFormik({
    initialValues: {
      newName: '',
    },
    validationSchema: yup.object({
      newName: yup.string()
      .trim()
      .min(3, t('invalidLengthError'))
      .max(20, t('invalidLengthError'))
      .notOneOf(channels.map((channel) => channel.name), t('notUniqueError'))
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => handleSubmit(values),
  });

  const inputClasses = cn('mb-2', { 'is-invalid': formik.errors.newName });

  return (
  <>
    <Modal.Header closeButton>
      <Modal.Title>{t('header')}</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Form onSubmit={formik.handleSubmit}>
        <div>
          <Form.Group>
            <Form.Label visuallyHidden>{t('label')}</Form.Label>
            <Form.Control
              ref={channelNameInput}
              required
              id="newName"
              name="newName"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.username}
              className={inputClasses}
              disabled={isDisabled}
            />
            {formik.errors.newName
              ? <div className="invalid-feedback">{t('invalidFeedback')}</div>
              : null}
          </Form.Group>
          <div className="d-flex justify-content-end">
            <Button variant="secondary" onClick={handleClose} className="me-2" disabled={isDisabled}>
              {t('closeButton')}
            </Button>
            <Button variant="primary" type="submit" disabled={isDisabled}>
              {t('addButton')}
            </Button>
          </div>
        </div>
      </Form>
    </Modal.Body>
  </>
  )
};

export default RenameChannel;