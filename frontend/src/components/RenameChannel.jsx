import React, { useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import * as yup from 'yup';
import { selectors as channelsSelectors } from '../slices/channelsSlice.js';
import useAuth from '../hooks/useAuth.js';

const RenameChannel = ({ handleClose }) => {
  const channelNameInput = useRef(null);
  useEffect(() => channelNameInput.current.focus(), []);
  const modal = useSelector((state) => state.modal.displayedModal);
  const channels = useSelector(channelsSelectors.selectAll);
  const renamedChannel = channels.find((channel) => channel.id === modal.channelId);
  const { socket } = useAuth();

  const { t } = useTranslation('translation', { keyPrefix: 'renameChannelModal' });

  const handleSubmit = (values) => {
    const { newName } = values;
    socket.emit('renameChannel', { name: newName.trim(), id: modal.channelId });
  };

  const formik = useFormik({
    initialValues: {
      newName: renamedChannel.name,
    },
    validationSchema: yup.object({
      newName: yup.string()
        .trim()
        .min(3, t('invalidLengthError'))
        .max(20, t('invalidLengthError'))
        .notOneOf(channels.map((channel) => channel.name), t('notUniqueError')),
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
            <Form.Control
              ref={channelNameInput}
              required
              id="newName"
              name="newName"
              onChange={formik.handleChange}
              value={formik.values.newName}
              className={inputClasses}
              disabled={formik.isSubmitting}
            />
            <Form.Label visuallyHidden htmlFor="newName">{t('label')}</Form.Label>
            <div className="invalid-feedback">{formik.errors.newName}</div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2" disabled={formik.isSubmitting}>
                {t('closeButton')}
              </Button>
              <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
                {t('addButton')}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
