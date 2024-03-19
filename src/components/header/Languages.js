import React from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import './Languages.css';
import { Button } from 'react-bootstrap';
import useLocalStorage from "../../hooks/useLocalStorage";

const Languages = () => {
  const { t, i18n } = useTranslation();
  const currentLanguage = i18n.language;
  const [getLanguage, setLanguage] = useLocalStorage();

  const updateLanguage = async (language) =>{
    await i18n.changeLanguage(language);
  }

  const languageSelected = getLanguage(['fi','sv','en']);
  if (languageSelected !== null && currentLanguage !== languageSelected) {
    updateLanguage(currentLanguage);
  }



  const onClick = async (language) => {
    document.documentElement.lang = language;
    await i18n.changeLanguage(language);
    setLanguage(language, language);
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
