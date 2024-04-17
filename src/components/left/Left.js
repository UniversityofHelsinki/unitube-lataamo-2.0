import React, {useState} from 'react';
import DOMPurify from 'dompurify';
import './Left.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LeftList from './LeftList';
import Navigation from './Navigation';
import RecordCard from '../record/card/RecordCard';
import Loading from '../utilities/Loading';
import useSearchParams from '../../hooks/useSearchParams';
import useLocation from '../../hooks/useLocation';
import useCollections from '../../hooks/useCollections';
import CollectionCard from '../collection/card/CollectionCard';
import RecordListActions from './RecordListActions';
import CollectionActions from './CollectionActions';
import {useTranslation} from 'react-i18next';
import useVisibleRecords from '../../hooks/useVisibleRecords';
import useTitle from '../../hooks/useTitle';
import useRecordSort from '../../hooks/record/useRecordSort';
import useCollectionSort from '../../hooks/collection/useCollectionSort';
import Colors from '../../components/utilities/HyColors';

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
  const { i18n } = useTranslation();
  const [setTitle] = useTitle();
  const [recordOptions, setRecordOptions] = useState({
    showDeleted: false,
    showRecordsInCollections: false,
    filtered : false
  });

  const [records, loadingRecords, _reloadRecords] = useVisibleRecords({
    showDeleted: recordOptions.showDeleted,
    showAll: recordOptions.showRecordsInCollections,
    load: path === '/records'
  });

  const [recordSortOptions, setRecordSortOptions] = useState({
    criteria: 'created',
    descending: true
  });

  const [sortedRecords, recordSortCriterias] = useRecordSort(
      records,
      recordSortOptions.criteria,
      recordSortOptions.descending
  );

  const [collections, loadingCollections] = useCollections(
      path === '/collections'
  );

  const [collectionSortOptions, setCollectionSortOptions] = useState({
    criteria: 'created',
    descending: true
  });

  const [sortedCollections, collectionSortCriterias] = useCollectionSort(
      collections,
      collectionSortOptions.criteria,
      collectionSortOptions.descending
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const onRecordCardClick = (record) => {
    setSearchParams({ 'record': record.identifier });
  };

  const onCollectionCardClick = (collection) => {
    setSearchParams({ 'collection': collection.identifier });
  };

  const highlightMatch = (text, searchValue) => {
    if (!text) return null;

    const regex = new RegExp(`(${searchValue})`, 'gi');
    return text.replace(regex, `<span style="background-color: ${Colors.orange}">$1</span>`);
  };

  /**
   * Filters an array of records based on the given options.
   *
   * @param {array} records - The array of records to filter.
   * @param {object} recordOptions - The options to use for filtering.
   * @param {string} recordOptions.searchValue - The value to search for in the records.
   * @returns {array} - The filtered array of records.
   */
  const filterRecordsQuery = (records, recordOptions) => {
    if (typeof recordOptions?.searchValue === 'string' && recordOptions?.searchValue.trim()) {
      const sanitizedSearchValue = DOMPurify.sanitize(recordOptions.searchValue.toLowerCase());
      const regex = new RegExp(sanitizedSearchValue);
      const filteredRecords = records.map(record => {
        const formattedCreated = new Intl.DateTimeFormat(i18n.language, {
          day: '2-digit', month: '2-digit', year: 'numeric'
        }).format(new Date(record.created));
        const { title, description, identifier, duration } = record;
        const highlightedTitle = highlightMatch(title, sanitizedSearchValue);
        const highlightedDescription = highlightMatch(description, sanitizedSearchValue);
        const highlightedIdentifier = highlightMatch(identifier, sanitizedSearchValue);
        const highlightedDuration = highlightMatch(duration, sanitizedSearchValue);
        const highlightedCreation = highlightMatch(formattedCreated, sanitizedSearchValue);

        return {
          ...record,
          formattedCreated,
          highlightedTitle,
          highlightedDescription,
          highlightedIdentifier,
          highlightedDuration,
          highlightedCreation,
        };
      }).filter(record =>
          regex.test(record?.title?.toLowerCase())
          || regex.test(record?.description?.toLowerCase())
          || (record.identifier?.toLowerCase() === sanitizedSearchValue)
          || regex.test(record?.duration?.toLowerCase())
          || regex.test(record?.formattedCreated))
      return filteredRecords;
    } else {
      return records;
    }
  };

  const recordCards = filterRecordsQuery(sortedRecords || [], recordOptions).map((record, _i) =>
      [<RecordCard
          key={record.identifier}
          onClick={() => onRecordCardClick(record)}
          record={record}
          selected={record.identifier === searchParams.record }/>,
        record.identifier]
  );

  const collectionCards = (sortedCollections || []).map((collection, i) =>
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
    '/records': <RecordListActions options={recordOptions} onOptionChange={(options) => setRecordOptions(options)} />,
    '/collections': <CollectionActions />
  };

  const loading = {
    '/records': loadingRecords,
    '/collections': loadingCollections
  };

  const sortOptions = {
    '/records': recordSortOptions,
    '/collections': collectionSortOptions
  }[path];

  const sortCriterias = {
    '/records': recordSortCriterias,
    '/collections': collectionSortCriterias
  }[path];

  const onSortOptionChange = async (criteria, descending) => {
    if (sortOptions === recordSortOptions) {
      setRecordSortOptions({ ...recordSortOptions, criteria, descending });
    }
    if (sortOptions === collectionSortOptions) {
      setCollectionSortOptions({ ...collectionSortOptions, criteria, descending });
    }
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
              <LeftList currentSortCriteria={sortOptions?.criteria} sortCriterias={sortCriterias} descending={sortOptions?.descending} onSortOptionChange={onSortOptionChange}>
                {(() => {
                  if (listElements[path].length > 0) {
                    return listElements[path];
                  }
                  return [[
                    <React.Fragment key="empty">
                      {emptyElements[path]}
                    </React.Fragment>
                  ]];
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
