import React, { useEffect, useState } from 'react';
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

const Record = () => {
  const [originalRecord, loading, reload] = useRecord();
  const [modified, setModified] = useState(false);
  const [modifiedRecord, setModifiedRecord] = useState(null);
  const [modifiedFields, setModifiedFields] = useState({});
  const [progress, save, resetProgress] = useRecordSave();

  const [isValid, messages, validate] = useRecordValidation([
    'title', 'description', 'deletionDate', 'license'
  ]);

  const record = modifiedRecord || originalRecord;

  const reset = () => {
    setModified(false);
    setModifiedFields({});
  };

  useEffect(() => {
    if (originalRecord && originalRecord.identifier !== modifiedRecord?.identifier) {
      setModifiedRecord({ ...originalRecord });
      setModified(false);
      setModifiedFields({});
      resetProgress();
    }
  }, [originalRecord]);

  const onChange = async (what, value) => {
    const newRecord = { ...record, [what]: value };

    console.log(what, value);

    const newModifiedFields = {
      ...modifiedFields,
      [what]: newRecord[what] !== record[what]
    };

    const recordDoesNotEqualOriginal = 
      Object.values(newModifiedFields).reduce((a, c) => c || a, false);

    setModified(recordDoesNotEqualOriginal);
    setModifiedFields(newModifiedFields);
    setModifiedRecord(newRecord);

    await validate(newRecord);
  };

  const undo = async () => {
    setModifiedRecord({ ...originalRecord });
    setModified(false);
    await validate({ ...originalRecord });
  };

  const handleSave = async (event) => {
    event.preventDefault();

    const success = await save({
       record,
       subtitles: record.subtitleFile && { file: record.subtitleFile, record } || undefined,
       orderSubtitles: record.automaticSubtitles
    });

    if (success) {
      reset();
      reload();
    }

  };

  const saveInProgress 
    = progress.status !== 'NOT_STARTED' && progress.status !== 'DONE';


 return (
      <form onSubmit={handleSave}>
      <Container className="record" >
          <Row className="record-row">
            <Loading loading={loading}>
            <Col>
              <Container className="ps-0">
                <Row className="breadcrumb-container">
                  <RecordsBreadCrumb record={record} />
                </Row>
                <Row>
                  <Col lg={5} className="ps-0">
                    <RecordStaticInformation record={record} />
                  </Col>
                  <Col lg>
                    <RecordForm 
                      record={record} 
                      onChange={onChange} 
                      validationMessages={messages} 
                      disabled={saveInProgress} />
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
                  undo={undo}
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
