import React from 'react';
import PropTypes from 'prop-types';
import '../../record/card/RecordCard.css';
import {Col, Container, Row} from 'react-bootstrap';
import i18n from "i18next";
import {useTranslation} from "react-i18next";

/**
 * Calculates the duration between two time values and formats it as "HH:MM:SS".
 *
 * @param {Date} start - The start time value.
 * @param {Date} end - The end time value.
 * @returns {string} The duration in the format "HH:MM:SS".
 */
const getDuration = (start, end) => {
    let diff = end - start; // difference in milliseconds

    let hours = Math.floor(diff / 1000 / 60 / 60);
    diff -= hours * 1000 * 60 * 60;

    let minutes = Math.floor(diff / 1000 / 60);
    diff -= minutes * 1000 * 60;

    let seconds = Math.floor(diff / 1000);

    // Ensure the format "HH:MM:SS"
    let formatted = [
        hours.toString().padStart(2, '0'),
        minutes.toString().padStart(2, '0'),
        seconds.toString().padStart(2, '0')
    ].join(':');

    return formatted;
};

/**
 * StatisticCard component represents a card displaying statistics.
 *
 * @param {Object} props - The component's properties.
 * @param {Object} props.statistic - The statistic object containing data to be displayed.
 * @param {Function} props.onClick - The function to be called when the card is clicked.
 * @param {boolean} [props.selected=false] - Indicates whether the card is selected or not.
 * @returns {JSX.Element} - The rendered StatisticCard component.
 */
const StatisticCard = ({ statistic, onClick, selected = false }) => {
    const { t } = useTranslation();
    const selectedClass = selected ? 'statistic-card-selected' : '';
    const formattedDate = new Intl.DateTimeFormat(i18n.language, {
        day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(new Date(statistic.start_timestamp));
    const duration = getDuration(statistic.start_timestamp, statistic.end_before_timestamp);

    return (
        <Container style={{ minHeight: '160px' }} className="border">
            <Row>
                <Col lg={12} className={`${selectedClass}`}>
                    <div className="statistic-card-content-details-top">
                        <div>
                            {formattedDate}
                        </div>
                        <div>
                            {t('stream_location')} {statistic.location}
                        </div>
                        <div>
                            {t('stream_max_viewers')} {statistic.maxViewers}
                        </div>
                        <div>
                            {t('stream_duration')} {duration}
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

StatisticCard.propTypes = {
    statistic: PropTypes.object.isRequired
};

export default StatisticCard;
