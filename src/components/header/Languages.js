import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './Languages.css';
import { Button } from 'react-bootstrap';

const Languages = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;

  const onClick = async (language) => {
    document.documentElement.lang = language;
    await i18n.changeLanguage(language);
  };

  return (
    <ul className="languages">
      {['fi', 'en', 'sv'].map((language) =>
        <li
          key={language}>
            <Button onClick={() => onClick(language)} variant="link" active={language === currentLanguage}>
              {t(`language_select_${language}`)}
            </Button>
        </li>
      )}
    </ul>
  );
};

Languages.propTypes = {
};

export default Languages;
