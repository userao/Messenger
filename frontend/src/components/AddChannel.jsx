import React, { useRef, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import cn from 'classnames';
import * as yup from 'yup';
import {
  selectors as channelsSelectors,
  actions as channelsActions,
} from '../slices/channelsSlice.js';
import i18n from '../i18n.js';

const AddChannel = ({ handleClose }) => {
  const channelNameInput = useRef(null);
  useEffect(() => channelNameInput.current.focus(), []);
  const dispatch = useDispatch();
  const channels = useSelector(channelsSelectors.selectAll);

  const handleSubmit = (values) => {
    const { channelName } = values;
    dispatch(channelsActions.emitNewChannel({ name: channelName.trim() }));
  };

  const formik = useFormik({
    initialValues: {
      channelName: '',
    },
    validationSchema: yup.object({
      channelName: yup.string()
        .trim()
        .min(3, i18n.t('addChannelModal.invalidLengthError'))
        .max(20, i18n.t('addChannelModal.invalidLengthError'))
        .notOneOf(channels.map((channel) => channel.name), i18n.t('addChannelModal.notUniqueError')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => handleSubmit(values),
  });

  const inputClasses = cn('mb-2', { 'is-invalid': formik.errors.channelName });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('addChannelModal.header')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <div>
            <Form.Control
              ref={channelNameInput}
              required
              id="channelName"
              name="channelName"
              onChange={formik.handleChange}
              value={formik.values.username}
              className={inputClasses}
              disabled={formik.isSubmitting}
            />
            <Form.Label visuallyHidden htmlFor="channelName">{i18n.t('addChannelModal.label')}</Form.Label>
            <div className="invalid-feedback">{formik.errors.channelName}</div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2" disabled={formik.isSubmitting}>
                {i18n.t('addChannelModal.closeButton')}
              </Button>
              <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
                {i18n.t('addChannelModal.addButton')}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default AddChannel;
