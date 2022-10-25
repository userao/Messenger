import React from 'react';
import { useTranslation } from 'react-i18next';

const NotFound = () => {
  const { t } = useTranslation('translation', { keyPrefix: 'notFoundPage' });

  return (
    <div className="d-flex flex-column align-items-center justify-content-center h-50 ">
      <h1>{t('header')}</h1>
      <a href="/">{t('linkToMain')}</a>
    </div>
  );
};

export default NotFound;
