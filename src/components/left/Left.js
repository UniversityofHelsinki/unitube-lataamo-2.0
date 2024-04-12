import React, {useState} from 'react';
import DOMPurify from 'dompurify';
import './Left.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LeftList from './LeftList';
import Navigation from './Navigation';
import RecordCard from '../record/card/RecordCard';
import StatisticCard  from "../statistic/card/StatisticCard";
import Loading from '../utilities/Loading';
import useSearchParams from '../../hooks/useSearchParams';
import useLocation from '../../hooks/useLocation';
import useCollections from '../../hooks/useCollections';
import useStatistics from "../../hooks/useStatistics";
import CollectionCard from '../collection/card/CollectionCard';
import RecordListActions from './RecordListActions';
import CollectionActions from './CollectionActions';
import {useTranslation} from 'react-i18next';
import useVisibleRecords from '../../hooks/useVisibleRecords';
import useTitle from '../../hooks/useTitle';
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

const NoStatistics = () => {
  const { t } = useTranslation();
  return (
      <No>
        {t('left_user_has_no_statistics')}
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
    load: path === '/records',
    filtered : recordOptions.filtered,
    searchValue : recordOptions.searchValue
  });

  const [collections, loadingCollections] = useCollections(
    path === '/collections'
  );

  const [statistics, loadingStatistics] = useStatistics(
      path === '/statistics'
  );

  const [searchParams, setSearchParams] = useSearchParams();

  const onRecordCardClick = (record) => {
    setSearchParams({ 'record': record.identifier });
  };

  const onCollectionCardClick = (collection) => {
    setSearchParams({ 'collection': collection.identifier });
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
          record?.title?.toLowerCase().includes(sanitizedSearchValue)
          || record?.description?.toLowerCase().includes(sanitizedSearchValue)
          || record?.identifier?.toLowerCase() === sanitizedSearchValue
          || record?.duration?.toLowerCase() === sanitizedSearchValue
          || record?.formattedCreated === sanitizedSearchValue  // use formatted created date in condition
      );
      return filteredRecords;
    } else {
      return records;
    }
  };

  const highlightMatch = (text, searchValue) => {
    if (!text) return null;

    const regex = new RegExp(`(${searchValue})`, 'gi');
    return text.replace(regex, `<span style="background-color: ${Colors.orange}">$1</span>`);
  };


  /**
   * Filter and map records to create record cards.
   *
   * @param {Array} records - The array of records to filter and map.
   * @param {Object} recordOptions - The options for filtering the records.
   * @return {Array} - The array of generated record cards.
   */
  const recordCards = filterRecordsQuery(records || [], recordOptions).map((record, _i) =>
      [<RecordCard
          key={record.identifier}
          onClick={() => onRecordCardClick(record)}
          record={record}
          selected={record.identifier === searchParams.record }/>,
        record.identifier]
  );

 /**
  * Sorts an array of statistics objects based on the start timestamps in descending order.
  *
  * @param {Array} statistics - The array of statistics objects to be sorted.
  * @returns {Array} - The sorted array of statistics objects.
  */
 const sortedStatistics = statistics => statistics.sort((a, b) => b.start_timestamp - a.start_timestamp);


 /**
  * Creates an array of StatisticCard components based on the given statistics array.
  *
  * @param {Array} statistics - The array of statistics objects.
  * @returns {Array} - An array of StatisticCard components.
  */
 const statisticCards = sortedStatistics(statistics).map((statistic, _i) => {
    return [<StatisticCard
        key={statistic.start_timestamp}
        statistic={statistic}/>];
  });

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
    '/collections': <NoCollections />,
    '/statistics': <NoStatistics />
  };

  const listElements = {
    '/records': recordCards,
    '/collections': collectionCards,
    '/statistics': statisticCards
  };

  const actionElement = {
    '/records': <RecordListActions options={recordOptions} onOptionChange={(options) => setRecordOptions(options)} />,
    '/collections': <CollectionActions />
  };

  const loading = {
    '/records': loadingRecords,
    '/collections': loadingCollections,
    '/statistics': loadingStatistics
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
