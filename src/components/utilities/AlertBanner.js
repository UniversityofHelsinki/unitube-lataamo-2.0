import React from 'react';
import PropTypes from 'prop-types';
import './AlertBanner.css';
import {ReactComponent as Info} from '../utilities/icons/info.svg';
import {useTranslation} from 'react-i18next';

const AlertBanner = ({body}) => {
    const { t } = useTranslation();
    return (
        <div className="crisis-banner-container">
            <div className="crisis-banner">
                <div className="crisis-banner-warning">
                    <Info />
                </div>
                <div className="crisis-banner-content">
                    <div className="crisis-banner-explanation">
                        {body}
                    </div>
                </div>
            </div>
        </div>
    );
};

AlertBanner.propTypes = {
    heading: PropTypes.string,
    body: PropTypes.string
};

export default AlertBanner;
