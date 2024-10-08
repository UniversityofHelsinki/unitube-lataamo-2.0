import React, { useId, useState } from 'react';
import PropTypes from 'prop-types';
import './CollectionMoodleCourses.css';
import {Col, Container, Row} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CourseIcon } from '../../utilities/icons/opinder-logo.svg';
import FormElementHeader from '../../form/FormElementHeader';
import CollectionMoodleCourse from "./CollectionMoodleCourse";
import InputField from "../../form/InputField";
import HelpDialog from '../../dialog/HelpDialog';
import { onEnter } from '../../accessibility/keydown';
import HyButton from '../../utilities/HyButton';
import { MOODLE_NUMBER_LIMIT } from '../../../Constants';

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

    const onEnterAddMoodleCourse = (event) => {
      if (inputFieldContainsValidMoodleCourse) {
        onEnter(addMoodleCourse)(event);
      }
    };

    const moodleNumberLimitExceeded = moodleNumbers.length >= MOODLE_NUMBER_LIMIT;

    const tooManyMoodleNumbers = (() => {
      if (moodleNumberLimitExceeded) {
        return (
          <div className="collection-moodle-courses-limit-exceeded">
            <p>{t('collection_moodle_courses_limit_exceeded')}</p>
          </div>
        );
      }
      return <></>;
    })();


    return (
        <Container className="collection-moodle-courses ps-0">
            <Row>
              <Col>
                <FormElementHeader 
                  id={id}
                  helpDialog={(
                    <HelpDialog label={t('collection_moodle_courses_help_label')}>
                      {t('collection_moodle_courses_help_content')}
                    </HelpDialog>
                  )}
                >
                  {t('collection_moodle_courses_form_header')}
                </FormElementHeader>
              </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                  <div className="collection-moodle-courses-input">
                    <InputField aria-labelledby={id} type={'text'} placeholder={t('moodle_course_placeholder')} value={value || ''} onChange={handleMoodleInputChange} disabled={disabled || moodleNumberLimitExceeded} onKeyDown={onEnterAddMoodleCourse} hideMessage={true} />
                    <HyButton variant="primary" className="collection-moodle-courses-add-button" onClick={addMoodleCourse} disabled={!inputFieldContainsValidMoodleCourse}>{t('collection_moodle_courses_add_button')}</HyButton>
                  </div>
                </Col>
            </Row>
            <Row>
              <Col>
                  <span aria-live="polite"> {tooManyMoodleNumbers} </span>
              </Col>
            </Row>
            <Row>
                <Col>
                    <ul className="collection-moodle-courses-list">
                        {moodleNumbers.map((moodleNbr) =>
                            <li key={moodleNbr}>
                                <CollectionMoodleCourse label={moodleNbr} onRemove={() => removeMoodleCourse(moodleNbr)} Icon={CourseIcon} disabled={disabled} />
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
