import React, { useState } from 'react';
import PropTypes, {number} from 'prop-types';
import './CollectionMoodleCourses.css';
import {Button, Col, Container, Row} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ReactComponent as CourseIcon } from '../../utilities/icons/opinder-logo.svg';
import FormElementHeader from '../../form/FormElementHeader';
import CollectionMoodleCourse from "./CollectionMoodleCourse";
import InputField from "../../form/InputField";
import HelpDialog from '../../dialog/HelpDialog';

const CollectionMoodleCourses = ({ moodleNumbers = [] }) => {
    const [selectedMoodlenumbers, setSelectedMoodlenumbers] = useState(moodleNumbers);
    const [moodlenum, setMoodlenum] = useState({
        moodleNumber: ''
    });
    const { t } = useTranslation();
    const addMoodleCourse = () => {
        if (moodlenum && moodlenum?.moodleNumber?.length >0)
        if (!selectedMoodlenumbers.map(m => m.moodleNumber).includes(moodlenum.moodleNumber)) {
            setSelectedMoodlenumbers([ ...selectedMoodlenumbers, moodlenum ]);
        }
        setMoodlenum({ moodleNumber: '' });
    };
    const removeMoodleCourse = (moodleNbr) => {
        setSelectedMoodlenumbers(selectedMoodlenumbers.filter(m => m.moodleNumber !== moodleNbr.moodleNumber));
    };

    const containsOnlyNumbers = (event) => {
        if (/^\d+$/.test(event.target.value)) {
            return true;
        }
        return false;
    };

    const handleMoodleInputChange = (event) => {
        if(event.target.value === '' || containsOnlyNumbers(event)) {
            setMoodlenum(() => ({ ...moodlenum, moodleNumber:event.target.value }));
        }
    };

    return (
        <Container className="collection-moodle-courses ps-0">
            <Row>
                <FormElementHeader>{t('collection_moodle_courses_form_header')}</FormElementHeader>
            </Row>
            <Row className="mb-2">
                <Col>
                  <HelpDialog label={t('collection_moodle_courses_help_label')}>
                    {t('collection_moodle_courses_help_content')}
                  </HelpDialog>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <InputField type={'text'} label={t('aaa')} placeholder={t('moodle_course_placeholder')} value={moodlenum.moodleNumber} onChange={handleMoodleInputChange} />
                </Col>
                <Col className="ps-0">
                    <Button className="btn btn-primary collection-moodle-courses-add-button" onClick={addMoodleCourse}>Lisää</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul className="collection-moodle-courses-list">
                        {selectedMoodlenumbers.map((moodleNbr) =>
                            <li key={moodleNbr.moodleNumber}>
                                <CollectionMoodleCourse label={moodleNbr.moodleNumber} onRemove={() => removeMoodleCourse(moodleNbr)} Icon={CourseIcon} />
                            </li>)}
                    </ul>
                </Col>
            </Row>
        </Container>
    );
};

CollectionMoodleCourses.propTypes = {
    moodleNumbers: PropTypes.array,
};

export default CollectionMoodleCourses;
