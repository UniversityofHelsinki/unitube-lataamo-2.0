import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './Languages.css';

const Languages = () => {
  const { t, i18n } = useTranslation();

  const onClick = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <ul className="languages">
      {['fi', 'en', 'sv'].map((language) => 
        <li onClick={() => onClick(language)}>{t(`language_select_${language}`)}</li>
      )}
    </ul>
  );
};

Languages.propTypes = {
};

export default Languages;
