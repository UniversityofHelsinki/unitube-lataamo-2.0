import React, {useId} from 'react';
import PropTypes from 'prop-types';
import './RecordCard.css';
import useUser from '../../../hooks/useUser';
import {useTranslation} from "react-i18next";
import {Col, Container, Row} from 'react-bootstrap';

const StatisticCard = ({ statistic, onClick, selected = false }) => {
    console.log(statistic);
    const selectedClass = selected ? 'statistic-card-selected' : '';
    const [user] = useUser();
    const labelId = useId();
    const { t, i18n } = useTranslation();
    return (
        <Container style={{ minHeight: '160px' }} className="border">
            <Row>
                <Col lg={6} className={`${selectedClass}`}>
                        <div className="record-card-content-details-top">
                            <div>
                                {statistic.location}
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
