import React from 'react';
import i18n from '../i18n.js';

const NotFound = () => (
  <div className="d-flex flex-column align-items-center justify-content-center h-50 ">
    <h1>{i18n.t('notFoundPage.header')}</h1>
    <a href="/">{i18n.t('notFoundPage.linkToMain')}</a>
  </div>
);

export default NotFound;
