import React from 'react';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { useTranslation } from 'react-i18next';
import ClipBoardFormElement from "./ClipBoardFormElement";
import Colors from "../utilities/HyColors";
import { ReactComponent as ExternalLinkIcon } from './../utilities/icons/external-link.svg';
import PropTypes from "prop-types";

const RecordLink = ({to, linklabel}) => {
    const { t } = useTranslation();

    const ExternalLink = ({ to, linklabel }) => {
        return (
            <>
                <a href={to} style={{ paddingRight: '8px' }}>{linklabel}</a>
                <ExternalLinkIcon height={12} width={12} fill={Colors.white} />
            </>
        );
    };

    return (
        <Container>
            <Row>
                <Col>
                    <ClipBoardFormElement label={t('record_link_header')} size={'h5'} />
                </Col>
            </Row>
            <Row>
                <Col>
                    <ExternalLink to={to} linklabel={linklabel} />
                </Col>
            </Row>
        </Container>
    );
};

RecordLink.propTypes = {
    to: PropTypes.string.isRequired,
    linklabel: PropTypes.string.isRequired
};

export default RecordLink;
