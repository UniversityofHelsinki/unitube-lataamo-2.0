import React, {useId} from 'react';
import PropTypes from 'prop-types';
import './StatisticCard.css';
import {Col, Container, Row} from 'react-bootstrap';
import i18n from "i18next";
import {useTranslation} from "react-i18next";
import onKeyDown from "../../accessibility/keydown";
import {useDispatch} from "react-redux";
import selectStatistic from "../../../hooks/useStatistic";
import {getDuration} from "../../utilities/timeUtils";

/**
 * Calculates the duration between two time values and formats it as "HH:MM:SS".
 *
 * @param {Date} start - The start time value.
 * @param {Date} end - The end time value.
 * @returns {string} The duration in the format "HH:MM:SS".
 */


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
    const dispatch = useDispatch();
    const labelId = useId();
    const selectedClass = selected ? 'statistic-card-selected' : '';
    const formattedDate = new Intl.DateTimeFormat(i18n.language, {
        day: '2-digit', month: '2-digit', year: 'numeric'
    }).format(new Date(statistic.start_timestamp));
    const duration = getDuration(statistic.start_timestamp, statistic.end_before_timestamp);
    statistic = {...statistic, formattedDate: formattedDate, duration : duration};

    const handleClick = (event) => {
        event.preventDefault();
        dispatch(selectStatistic(statistic));
        if (onClick) {
            onClick();
        }
    };

    return (
        <Container style={{ minHeight: '100px' }} className="border">
            <Row>
                <Col lg={12} className={`${selectedClass}`}>
                    <div className="statistic-card-content-details-top">
                        <div>
                            {formattedDate}
                        </div>
                        <div>
                            <a className="statistic-card-content-details"
                               href={`?room=${statistic.room}&start_timestamp=${statistic.start_timestamp}&end_before_timestamp=${statistic.end_before_timestamp}`}
                               onClick={handleClick}
                               onKeyDown={onKeyDown(handleClick)}
                               aria-labelledby={labelId}
                               aria-current={selected ? 'page' : false}
                            >{statistic.location}</a>
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
