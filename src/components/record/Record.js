import React, {useRef, useState} from 'react';
import PropTypes from 'prop-types';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import useRecord from '../../hooks/useRecord';
import RecordForm from './RecordForm';
import RecordStaticInformation from './RecordStaticInformation';
import './Record.css';
import Loading from '../utilities/Loading';
import RecordBottomBar from './RecordBottomBar';
import useRecordValidation from '../../hooks/validation/record/useRecordValidation';
import useRecordSave from '../../hooks/record/useRecordSave';
import useRecordModification from '../../hooks/useRecordModification';
import {ProgressStatus} from '../../Constants';
import RecordTopRow from './RecordTopRow';
import useCollections from '../../hooks/useCollections';
import useCollection from '../../hooks/useCollection';
import useTitle from '../../hooks/useTitle';
import useRecordError from '../../hooks/useRecordError';
import useVTTFiles from "../../hooks/useVTTFiles";
import useSubtitleConversion from "../../hooks/record/useSubtitleConversion";

const Record = () => {
    const [setTitle] = useTitle();
    const [originalRecord, loading, reload, httpError] = useRecord(true);
    const [vttFiles, loadingVTTFiles, reloadVTTFiles, httpErrorVTT] = useVTTFiles(true);
    const errorPage = useRecordError(originalRecord, httpError, reload);
    const [progress, save, resetProgress] = useRecordSave();
    const [_collections, _loadingCollections, reloadCollections] = useCollections();
    const [visibleCollection, _loadingVisibleCollection, reloadVisibleCollection] = useCollection();
    const [resetSubtitleDownloadLinks, setResetSubtitleDownloadLinks] = useState(false);
    const [subtitlesToDelete, setSubtitlesToDelete] = useState(new Set());
    const [isValid, messages, validate] = useRecordValidation([
      'title', 'description', 'deletionDate', 'license', 'selectedSubtitles'
    ], originalRecord);
    const [record, onChange, modified, undo] = useRecordModification(originalRecord, validate, resetProgress);
    const [doConvert, message, error] = useSubtitleConversion();
    const formRef = useRef();

    if (errorPage && !loading) {
      return errorPage;
    }

    if (originalRecord?.title) {
      setTitle(originalRecord.title);
    }

    const resetFileFields = () => {
        if (formRef.current) {
            formRef.current.reset();
        }
        setResetSubtitleDownloadLinks(!resetSubtitleDownloadLinks);
    };

    const undoRecord = () => {
        resetFileFields();
        resetProgress();
        undo();
    };

    const handleSubtitleChange = (action, data) => {
        if (action === 'deleteSubtitle') {
            const newSubtitlesToDelete = new Set(subtitlesToDelete);
            if (data) {
                newSubtitlesToDelete.add(data.language);
            } else {
                newSubtitlesToDelete.clear();
            }
            setSubtitlesToDelete(newSubtitlesToDelete);
            onChange('deleteSubtitle', {
                languages: Array.from(newSubtitlesToDelete),
                deleteSubtitle: newSubtitlesToDelete.size > 0
            });
        } else {
            onChange(action, data);
        }
    };

    const handleSave = async (event) => {
      event.preventDefault();
      const userDeletedSubtitles = record.deleteSubtitle;
      const success = await save({
        record,
        subtitles:
          record.selectedSubtitles?.type === 'subtitleFile' ? { ...record.selectedSubtitles.allFiles, identifier: record.identifier } : undefined,
        orderSubtitles: record.selectedSubtitles?.type === 'automaticSubtitles' ? { ...record.selectedSubtitles, identifier: record.identifier } : undefined,
          deleteSubtitle: (userDeletedSubtitles && !record.selectedSubtitles) ? {
              eventId: record.identifier,
              deleteSubtitle: true,
              languages: userDeletedSubtitles.languages // Array of languages to delete
          } : undefined,
        updateSubtitles: record.selectedSubtitles?.type === 'translationSubtitles' ? { eventId: record.identifier, value: record.selectedSubtitles.value} : undefined,
        subtitleConversion: undefined
      });

      if (success) {
        reload();
        reloadCollections();
        if (visibleCollection?.identifier === record.isPartOf || visibleCollection?.identifier === record.is_part_of) {
          reloadVisibleCollection();
        }
      }

    };

    const saveInProgress = progress.status !== ProgressStatus.RECORD_SAVE.NOT_STARTED && progress.status !== ProgressStatus.RECORD_SAVE.DONE;

    return (
      <form ref={formRef} onSubmit={handleSave}>
        <Container className="record">
          <Row className="record-row">
            <Loading loading={loading}>
              <Col>
                <Container className="ps-0">
                  <Row className="top-row-container">
                    <Col className="p-0">
                      <RecordTopRow record={originalRecord} disabled={saveInProgress} reload={reload} />
                    </Col>
                  </Row>
                  <Row>
                    <Col xl={5} className="ps-0">
                      <RecordStaticInformation
                        record={originalRecord}
                        onChange={handleSubtitleChange}
                        resetSubtitleDownloadLinks={resetSubtitleDownloadLinks}
                        disabled={saveInProgress}
                      />
                    </Col>
                    <Col xl className="ps-0">
                      <RecordForm
                        record={record}
                        vttFiles={vttFiles}
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
