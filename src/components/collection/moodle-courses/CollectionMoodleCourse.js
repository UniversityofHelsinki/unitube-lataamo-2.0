import React, {useId} from "react";
import {Col, Container, Row} from "react-bootstrap";
import './CollectionMoodleCourse.css'
import { ReactComponent as RemoveIcon } from '../../utilities/icons/remove.svg';
import onKeyDown from "../../accessibility/keydown";
import PropTypes from "prop-types";
import {useTranslation} from "react-i18next";

const CollectionMoodleCourse = ({ onRemove, Icon, label, disabled }) => {
    const labelId = useId();
    const { t } = useTranslation();
  
    const disabledClass = disabled ? 'collection-moodle-course-disabled' : '';

    return (
        <Container className={`collection-moodle-course ${disabledClass} py-1`} tabIndex={0} aria-labelledby={labelId}>
            <Row className="collection-moodle-course-row justify-content-between align-items-center">
                <Col className="ps-1 pe-0 collection-moodle-course-label-icon-col">
                    <Icon width="30px" height="30px" />
                </Col>
                <Col className="text-center">
                    <p className="mb-0 collection-moodle-course-label" id={labelId}>{label}</p>
                </Col>
                <Col className="text-end px-0 collection-moodle-course-remove-icon-col">
                  <RemoveIcon tabIndex={0} input-type="button" aria-label={t('remove')} aria-disabled={disabled} onClick={disabled ? () => {} : onRemove} onKeyDown={disabled ? () => {} : onKeyDown(onRemove)} width="30px" height="15px" />
                </Col>
            </Row>
        </Container>
    );
};

CollectionMoodleCourse.propTypes = {
    label: PropTypes.string.isRequired,
    onRemove: PropTypes.func.isRequired,
    Icon: PropTypes.any.isRequired,
    disabled: PropTypes.bool,
};

export default CollectionMoodleCourse;
