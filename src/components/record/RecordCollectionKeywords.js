import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './RecordCollectionKeywords.css'
import { Col, Container, Row } from 'react-bootstrap';
import CollectionKeyword from '../collection/keyword/CollectionKeyword';
import FormElementHeader from '../form/FormElementHeader';
import HelpDialog from '../dialog/HelpDialog';
import { useTranslation } from 'react-i18next';

const getCollection = async (identifier) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/series/${identifier}`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Unexpected status code from ${URL}`, {
      cause: { status: response.status }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const RecordCollectionKeywords = ({ id, onChange, disabled }) => {
  const { t } = useTranslation();

  const [collection, setCollection] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      setLoading(true);
      (async () => {
        setCollection(await getCollection(id))
        setLoading(false);
      })();
    }
  }, [id]);

  const keywords = collection?.keywords || [];

  if (loading || keywords.length === 0) {
    return <></>;
  }

  return (
    <Container>
      <Row>
        <Col>
          <FormElementHeader 
            id={id}
            helpDialog={(
              <HelpDialog label={t('record_collection_keywords_help_label')} >
                {t('record_collection_keywords_help_content')}
              </HelpDialog>
            )}
          >
            {t('record_collection_keywords_header')}
          </FormElementHeader>
          <ul className="new-record-collection-keywords">
            {keywords.map(keyword => (
              <li key={keyword.id}>
                <CollectionKeyword label={keyword.label} onRemove={() => {}} disabled />
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );

};

RecordCollectionKeywords.propTypes = {
};

export default RecordCollectionKeywords;