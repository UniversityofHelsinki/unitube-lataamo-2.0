import React, { useId, useState } from 'react';
import PropTypes, {number} from 'prop-types';
import './CollectionMoodleCourses.css';
import {Button, Col, Container, Row} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CourseIcon } from '../../utilities/icons/opinder-logo.svg';
import FormElementHeader from '../../form/FormElementHeader';
import CollectionMoodleCourse from "./CollectionMoodleCourse";
import InputField from "../../form/InputField";
import HelpDialog from '../../dialog/HelpDialog';

const CollectionMoodleCourses = ({ moodleNumbers = [], onMoodleNumberChange, disabled }) => {
    const [value, setValue] = useState(null);
    const { t } = useTranslation();
    const id = useId();

    const clearInputField = () => setValue(null);

    const addMoodleCourse = () => {
        if (!moodleNumbers.includes(value)) {
            const newMoodleNumbers = [ ...moodleNumbers, value ];
            if (onMoodleNumberChange) {
              onMoodleNumberChange(newMoodleNumbers);
              clearInputField();
            }
        }
    };

    const removeMoodleCourse = (moodleNbr) => {
        if (onMoodleNumberChange) {
          onMoodleNumberChange(
            moodleNumbers.filter(m => m !== moodleNbr)
          );
        }
    };

    const containsOnlyNumbers = (value) => {
        return /^\d+$/.test(value);
    };

    const handleMoodleInputChange = (event) => {
        setValue(event.target.value);
    };

    const inputFieldContainsValidMoodleCourse = value && value?.length > 0 && containsOnlyNumbers(value);

    return (
        <Container className="collection-moodle-courses ps-0">
            <Row>
              <Col>
                <FormElementHeader componentId={id}>{t('collection_moodle_courses_form_header')}</FormElementHeader>
              </Col>
            </Row>
            <Row className="mb-3">
                <Col>
                  <HelpDialog label={t('collection_moodle_courses_help_label')}>
                    {t('collection_moodle_courses_help_content')}
                  </HelpDialog>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <InputField id={id} type={'text'} label={t('aaa')} placeholder={t('moodle_course_placeholder')} value={value || ''} onChange={handleMoodleInputChange} disabled={disabled} />
                </Col>
                <Col className="ps-0">
                    <Button className="btn btn-primary collection-moodle-courses-add-button" onClick={addMoodleCourse} disabled={!inputFieldContainsValidMoodleCourse}>Lisää</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul className="collection-moodle-courses-list">
                        {moodleNumbers.map((moodleNbr) =>
                            <li key={moodleNbr}>
                                <CollectionMoodleCourse label={moodleNbr} onRemove={() => removeMoodleCourse(moodleNbr)} Icon={CourseIcon} />
                            </li>
                        )}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

CollectionMoodleCourses.propTypes = {
    moodleNumbers: PropTypes.array,
    onMoodleNumberChange: PropTypes.func,
    disabled: PropTypes.bool
};

export default CollectionMoodleCourses;
