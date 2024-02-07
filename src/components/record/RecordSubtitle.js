import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './RecordSubtitle.css';
import {Col, Container, Form, Row} from 'react-bootstrap';
import {useTranslation} from "react-i18next";
import FormElementHeader from "../form/FormElementHeader";
import { PUBLICITIES  } from '../../Constants.js';
import Toggle from "../form/Toggle";
import RecordSubtitleFile from "../form/RecordSubtitleFile";
import RecordAutomaticSubtitleFile from "../form/RecordAutomaticSubtitleFile";
import RecordAutomaticSubtitle from "../form/RecordAutomaticSubtitleFile";


const RecordSubtitle = ({ onChange, message, file }) => {
    const { t } = useTranslation();
    const id = useId();

    return (
        <Container className="ps-0">
            <Form.Group>
                <Row>
                    <Col>
                        <Toggle labels={[t('record_subtitle_file_header'), t('record_automatic_subtitle_header')]}>
                            <RecordSubtitleFile  onChange={(value) => onChange('file', value)} />
                            <RecordAutomaticSubtitleFile  onChange={(what, value) => onChange(what, value)} />
                        </Toggle>
                    </Col>
                </Row>
            </Form.Group>
        </Container>
    );
};

RecordSubtitle.propTypes = {
    onChange: PropTypes.func.isRequired,
    message: PropTypes.shape({
        content: PropTypes.string,
        type: PropTypes.oneOf(['light', 'neutral', 'warning'])
    }),
    file: PropTypes.object,

};

export default RecordSubtitle;
