import React from 'react';
import PropTypes from 'prop-types';
import './LandingPage.css';
import { ReactComponent as ArrowRight } from '../utilities/icons/arrow-right.svg';
import {useTranslation} from "react-i18next";


const LandingPage = () => {
    const {t} = useTranslation();
    return (
        <div className="landing-page">
            <div className="landing-page-introduction-container">
                <h2>{t('landing_page_introduction')}</h2>
            </div>
            <span className="landing-page-introduction-divider"></span>
            <div className="landing-page-description-container">
                <p>{t('landing_page_description')}</p>
            </div>
            <div className="landing-page-unitube-instructions-link-container">
                <a className="landing-page-unitube-instructions-link" href={t('landing_page_unitube_instructions_link')} aria-label={t('landing_page_unitube_instructions')} target="_blank" rel="noreferrer noopener">
                    {t('landing_page_unitube_instructions')}
                    <ArrowRight/>
                </a>
            </div>
        </div>
    );
};

LandingPage.propTypes = {};

export default LandingPage;
