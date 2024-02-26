import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './Left.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import ButtonRow from './ButtonRow';
import LeftList from './LeftList';
import Navigation from './Navigation';
import Search from './search/Search';
import RecordCard from '../record/card/RecordCard';
import Loading from '../utilities/Loading';
import useSearchParams from '../../hooks/useSearchParams';
import useRecords from '../../hooks/useRecords';
import useLocation from '../../hooks/useLocation';
import useCollections from '../../hooks/useCollections';
import CollectionCard from '../collection/card/CollectionCard';
import RecordActions from './RecordActions';
import CollectionActions from './CollectionActions';

const Left = () => {
  const [path] = useLocation();
  const [records, loadingRecords] = useRecords({ 
    load: path === '/records'
  });

  const [collections, loadingCollections] = useCollections({ 
    load: path === '/collections' 
  });

  const [searchParams, setSearchParams] = useSearchParams();

  const onClick = (record) => {
    setSearchParams({ 'record': record.identifier });
  };

  const recordCards = (records || []).map((record, i) => (
    <RecordCard 
      key={i} 
      onClick={() => onClick(record)} 
      record={record} 
      selected={record.identifier === searchParams.record }/>
  ));

  const collectionElements = (collections || []).map((collection, i) =>
    <CollectionCard 
        collection={collection}
        selected={collection.identifier === searchParams.collection}
        key={i} 
        onClick={() => setSearchParams({ 'collection': collection.identifier })} />
  );

  const listElements = {
    '/records': recordCards, 
    '/collections': collectionElements
  };

  const actionElement = {
    '/records': <RecordActions />,
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
              {listElements[path]}
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
