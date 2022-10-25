import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Channels from './Channels';
import { actions as modalActions } from '../slices/modalSlice';

const ChannelsCollumn = ({ channels }) => {
  const dispatch = useDispatch();
  const { t } = useTranslation('translation', { keyPrefix: 'chatPage' });

  return (
    <div className="col-4 col-md-2 border-end pt-5 px-0 bg-light">
      <div className="d-flex justify-content-between mb-2 ps-4 pe-2">
        <span>{t('channelsHeader')}</span>
        <Button
          variant="outline-primary"
          className="p-0 text-primary"
          onClick={() => dispatch(modalActions.setDisplayedModal({ type: 'adding' }))}
        >
          +
        </Button>
      </div>
      <Channels channels={channels} />
    </div>
  );
};

export default ChannelsCollumn;
