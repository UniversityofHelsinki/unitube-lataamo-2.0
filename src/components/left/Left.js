import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Left.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LeftList from './LeftList';
import Navigation from './Navigation';
import RecordCard from '../record/card/RecordCard';
import Loading from '../utilities/Loading';
import useSearchParams from '../../hooks/useSearchParams';
import useRecords from '../../hooks/useRecords';
import useLocation from '../../hooks/useLocation';
import useCollections from '../../hooks/useCollections';
import CollectionCard from '../collection/card/CollectionCard';
import RecordListActions from './RecordListActions';
import CollectionActions from './CollectionActions';
import { useTranslation } from 'react-i18next';
import useVisibleRecords from '../../hooks/useVisibleRecords';
import useTitle from '../../hooks/useTitle';

const No = ({ children }) => {
  return (
    <div className="left-no">
      <p>
        {children}
      </p>
    </div>
  );
};

const NoRecords = () => {
  const { t } = useTranslation();
  return (
    <No>
      {t('left_user_has_no_records')}
    </No>
  );
};

const NoCollections = () => {
  const { t } = useTranslation();
  return (
    <No>
      {t('left_user_has_no_collections')}
    </No>
  );
};

const Left = () => {
  const [path] = useLocation();
  const [setTitle] = useTitle();
  const [recordOptions, setRecordOptions] = useState({
    showDeleted: false,
    showRecordsInCollections: false
  });

  const [records, loadingRecords, _reloadRecords] = useVisibleRecords({
    showDeleted: recordOptions.showDeleted,
    showAll: recordOptions.showRecordsInCollections,
    load: path === '/records'
  });

  const [collections, loadingCollections] = useCollections(
    path === '/collections' 
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const onRecordCardClick = (record) => {
    setSearchParams({ 'record': record.identifier });
  };

  const onCollectionCardClick = (collection) => {
    setSearchParams({ 'collection': collection.identifier });
  };

  const recordCards = (records || []).map((record, _i) => 
    [<RecordCard 
      key={record.identifier} 
      onClick={() => onRecordCardClick(record)} 
      record={record} 
      selected={record.identifier === searchParams.record }/>,
      record.identifier]
  );

  const collectionCards = (collections || []).map((collection, i) =>
    [<CollectionCard 
        collection={collection}
        selected={collection.identifier === searchParams.collection}
        key={collection.identifier} 
      onClick={() => onCollectionCardClick(collection)} />,
      collection.identifier]
  );

  const emptyElements = {
    '/records': <NoRecords />,
    '/collections': <NoCollections />
  };

  const listElements = {
    '/records': recordCards,
    '/collections': collectionCards
  };

  const actionElement = {
    '/records': <RecordListActions options={recordOptions} records={records} loadingRecords={loadingRecords} onOptionChange={(options) => setRecordOptions(options)} />,
    '/collections': <CollectionActions />
  };

  const loading = {
    '/records': loadingRecords,
    '/collections': loadingCollections
  };

  return (
    <Container className="left">
      <Row className="left-up-left-container">
        <Col className="no-padding">
          <Container className="up-left border-bottom">
            <Row>
              <Col className="no-padding">
                <Navigation />
              </Col>
            </Row>
            <Row className="border-start border-end border-black">
              <Col className="mt-3 mb-3">
                {actionElement[path]}
              </Col>
            </Row>
          </Container>
        </Col>
      </Row>
      <Row className="border border-top-0 border-black left-down">
        <Col className="pe-0">
          <Loading loading={Boolean(loading[path])}>
            <LeftList>
              {(() => {
                if (listElements[path].length > 0) {
                  return listElements[path];
                }
                return [
                  <React.Fragment key="empty">
                    {emptyElements[path]}
                  </React.Fragment>
                ];
              })()}
            </LeftList>
          </Loading>
        </Col>
      </Row>
    </Container>
  );
};

Left.propTypes = {
};

export default Left;
