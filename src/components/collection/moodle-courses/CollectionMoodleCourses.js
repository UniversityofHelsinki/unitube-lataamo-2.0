import React, { useState } from 'react';
import PropTypes, {number} from 'prop-types';
import './CollectionMoodleCourses.css';
import {Button, Col, Container, Row} from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ReactComponent as UserIcon } from '../../utilities/icons/avatar.svg';
import FormElementHeader from '../../form/FormElementHeader';
import CollectionMoodleCourse from "./CollectionMoodleCourse";
import InputField from "../../form/InputField";

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
            event.persist();
            setMoodlenum(() => ({ ...moodlenum, moodleNumber:event.target.value }));
        }
    };

    return (
        <Container className="collection-moodle-courses">
            <Row>
                <FormElementHeader label={t('collection_management_rights_form_header')} />
            </Row>
            <Row className="mb-2">
                <Col>
                    <span>Mistä löydän kurssitunnistenumeron?</span>
                </Col>
            </Row>
            <Row className="mb-2">
                <Col>
                    <InputField type={'text'} label={t('aaa')} placeholder={t('collection_form_name_placeholder')} value={moodlenum.moodleNumber} onChange={handleMoodleInputChange} />
                </Col>
                <Col>
                    <Button className="col btn btn-primary" onClick={addMoodleCourse}>Lisää</Button>
                </Col>
            </Row>
            <Row>
                <Col>
                    <ul className="collection-moodle-courses-list">
                        {selectedMoodlenumbers.map((moodleNbr) =>
                            <li key={moodleNbr.moodleNumber}>
                                <CollectionMoodleCourse label={moodleNbr.moodleNumber} onRemove={() => removeMoodleCourse(moodleNbr)} Icon={UserIcon} />
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
