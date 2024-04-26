import React from 'react';
import PropTypes from 'prop-types';
import './LandingPage.css';
import { ReactComponent as ArrowRight } from '../utilities/icons/arrow-right.svg';
import {useTranslation} from "react-i18next";


const LandingPage = () => {
    const {t} = useTranslation();
    return (
        <div className="landing-page">
            <div className="landing-page-introduction">
                <h2>{t('landing_page_introduction')}</h2>
            </div>
            <div>
                <span className="landing-page-introduction-divider"></span>
            </div>
            <div className="landing-page-description">
                <p> {t('landing_page_description')} </p>
            </div>
            <div className="landing-page-unitube-instructions-link-container">
                <a className="landing-page-unitube-instructions-link" id="landing-page-unitube-instructions-link" href="https://google.com" aria-labelledby="landing-page-unitube-instructions-link" target="_self">
                    {t('landing_page_unitube_instructions_link')}
                    <ArrowRight />
                </a>
            </div>
        </div>
    );
};

LandingPage.propTypes = {};

export default LandingPage;
