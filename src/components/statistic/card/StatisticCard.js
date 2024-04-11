import React from 'react';
import PropTypes from 'prop-types';
import '../../record/card/RecordCard.css';
import {Col, Container, Row} from 'react-bootstrap';

const StatisticCard = ({ statistic, onClick, selected = false }) => {
    const selectedClass = selected ? 'statistic-card-selected' : '';
    return (
        <Container style={{ minHeight: '160px' }} className="border">
            <Row>
                <Col lg={6} className={`full-width ${selectedClass}`}>
                    <div className="statistic-card-content-details-top">
                        <div>
                            location: {statistic.location}
                        </div>
                        <div>
                            max viewers: {statistic.maxViewers}
                        </div>
                        <div>
                            date:
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
