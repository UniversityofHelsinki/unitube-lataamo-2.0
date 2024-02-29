import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useRecord from '../../hooks/useRecord';
import RecordForm from './RecordForm';
import RecordStaticInformation from './RecordStaticInformation';
import './Record.css';
import Loading from '../utilities/Loading';
import RecordsBreadCrumb from "../form/RecordsBreadCrumb";
import RecordBottomBar from './RecordBottomBar';
import useRecordValidation from '../../hooks/validation/record/useRecordValidation';
import useRecordSave from '../../hooks/record/useRecordSave';
import useRecordModification from '../../hooks/useRecordModification';
import { ProgressStatus } from '../../Constants';

const Record = () => {
  const [originalRecord, loading, reload] = useRecord();
  const [progress, save, resetProgress] = useRecordSave();

  const [isValid, messages, validate] = useRecordValidation([
    'title', 'description', 'deletionDate', 'license', 'subtitleFile', 'automaticSubtitles'
  ]);
  const [record, onChange, modified, undo] = useRecordModification(originalRecord, validate, resetProgress);

  const formRef = useRef();

  const resetFileFields = () => {
    if (formRef.current) {
      formRef.current.reset();
    }
  };

  const undoRecord = () => {
    resetFileFields();
    resetProgress();
    undo();
  };

  const handleSave = async (event) => {
    event.preventDefault();
    const userGaveSubtitles = record.subtitleFile;
    const userGaveAutomaticSubtitles = record.automaticSubtitles;

    const subtitles = userGaveSubtitles ? { file: record.subtitleFile, identifier: record.identifier } : undefined;
    const automaticSubtitles = userGaveAutomaticSubtitles ? { ...(record.automaticSubtitles), identifier: record.identifier } : undefined;

    const markedSubtitlesForDeletion = { eventId: record.identifier, deleteSubtitle: record.deleteSubtitle };

    debugger;

    const success = await save({
       record,
       subtitles,
       orderSubtitles: automaticSubtitles,
       deleteSubtitle: markedSubtitlesForDeletion
    });

    if (success) {
      reload();
    }

  };

  const saveInProgress = progress.status !== ProgressStatus.RECORD_SAVE.NOT_STARTED && progress.status !== ProgressStatus.RECORD_SAVE.DONE;

 return (
      <form ref={formRef} onSubmit={handleSave}>
        <Container className="record" >
            <Row className="record-row">
              <Loading loading={loading}>
              <Col>
                <Container className="ps-0">
                  <Row className="breadcrumb-container">
                      <RecordsBreadCrumb record={originalRecord} />
                  </Row>
                  <Row>
                    <Col lg={5} className="ps-0">
                      <RecordStaticInformation record={originalRecord} onChange={onChange}  />
                    </Col>
                    <Col lg>
                      <RecordForm
                        record={record}
                        onChange={onChange}
                        validationMessages={messages}
                        disabled={saveInProgress}
                      />
                    </Col>
                  </Row>
                </Container>
              </Col>
              </Loading>
            </Row>
            <Row className="record-bottom-bar">
              <Col>
                <RecordBottomBar
                    record={record}
                    progress={progress}
                    modified={modified}
                    undo={undoRecord}
                    isValid={isValid} />
              </Col>
            </Row>
        </Container>
      </form>
  );
};

Record.propTypes = {
  record: PropTypes.object,
  loading: PropTypes.bool,
};

export default Record;
