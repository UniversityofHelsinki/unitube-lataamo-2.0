import React from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import '../left/RecordActionOptions.css';
import { useTranslation } from 'react-i18next';
import useRecordTagOptions from '../../hooks/record/useRecordTagOptions';
import RecordTag from "./RecordTag";
import useUser from "../../hooks/useUser";
import './RecordTags.css';

const RecordTags = ({ records, loadingRecords }) => {
    const { t } = useTranslation();
    const [user] = useUser();

    if (loadingRecords) {
        return;
    }

    const RecordTagList = () => {

        const tags = useRecordTagOptions( records );

        return (
            <ul className="card-tags">
                {tags.map((tag) => (
                    <li key={tag.label}>
                        <RecordTag { ...tag } />
                    </li>
                ))}
            </ul>
        );
    };

    return (
        <Container>
            <Row>
                <Col>
                    <RecordTagList />
                </Col>
            </Row>
        </Container>
    );
};

RecordTags.propTypes = {
    records: PropTypes.array,
    loadingRecords: PropTypes.bool,
};

export default RecordTags;

