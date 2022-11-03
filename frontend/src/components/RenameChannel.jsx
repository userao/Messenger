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
import useFilter from '../hooks/useFilter';

const RenameChannel = ({ handleClose }) => {
  const filter = useFilter();
  const channelNameInput = useRef(null);
  useEffect(() => channelNameInput.current.focus(), []);
  const dispatch = useDispatch();
  const modal = useSelector((state) => state.modal.displayedModal);
  const channels = useSelector(channelsSelectors.selectAll);
  const renamedChannel = channels.find((channel) => channel.id === modal.channelId);

  const handleSubmit = (values) => {
    const { newName } = values;
    dispatch(channelsActions.emitRenameChannel({ name: newName.trim(), id: modal.channelId }));
  };

  const formik = useFormik({
    initialValues: {
      newName: filter.clean(renamedChannel.name),
    },
    validationSchema: yup.object({
      newName: yup.string()
        .trim()
        .min(3, i18n.t('renameChannelModal.invalidLengthError'))
        .max(20, i18n.t('renameChannelModal.invalidLengthError'))
        .notOneOf(channels.map((channel) => channel.name), i18n.t('renameChannelModal.notUniqueError')),
    }),
    validateOnChange: false,
    validateOnBlur: false,
    onSubmit: (values) => handleSubmit(values),
  });

  const inputClasses = cn('mb-2', { 'is-invalid': formik.errors.newName });

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title>{i18n.t('renameChannelModal.header')}</Modal.Title>
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
            <Form.Label visuallyHidden htmlFor="newName">{i18n.t('renameChannelModal.label')}</Form.Label>
            <div className="invalid-feedback">{formik.errors.newName}</div>
            <div className="d-flex justify-content-end">
              <Button variant="secondary" onClick={handleClose} className="me-2" disabled={formik.isSubmitting}>
                {i18n.t('renameChannelModal.closeButton')}
              </Button>
              <Button variant="primary" type="submit" disabled={formik.isSubmitting}>
                {i18n.t('renameChannelModal.addButton')}
              </Button>
            </div>
          </div>
        </Form>
      </Modal.Body>
    </>
  );
};

export default RenameChannel;
