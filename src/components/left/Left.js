import React, {useState} from 'react';
import DOMPurify from 'dompurify';
import './Left.css';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import LeftList from './LeftList';
import Navigation from './Navigation';
import RecordCard from '../record/card/RecordCard';
import StatisticCard from "../statistic/card/StatisticCard";
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
import useRecordSort from '../../hooks/record/useRecordSort';
import useCollectionSort from '../../hooks/collection/useCollectionSort';
import Colors from '../../components/utilities/HyColors';
import useRecordTagFilter from '../../hooks/record/useRecordTagFilter';
import useDistinctRecordTags from '../../hooks/record/useDistinctRecordTags';
import useSelectedRecordTags from '../../hooks/record/useSelectedRecordTags';
import useVisibilities from '../../hooks/useVisibilities';
import { useRef } from 'react';

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
    const [_leftHidden, _rightHidden, swapVisibleElement] = useVisibilities();
    const [setTitle] = useTitle();
    const [recordOptions, setRecordOptions] = useState({
        showDeleted: false,
        showRecordsInCollections: false,
        filtered : false
    });

    const [collectionOptions, setCollectionOptions] = useState({});

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

    const distinctRecordTags = useDistinctRecordTags(
        sortedRecords
    );
    const [selectedTags, onSelectedTagChange] = useSelectedRecordTags(
        distinctRecordTags
    );
    const tagFilteredRecords = useRecordTagFilter(
        sortedRecords,
        selectedTags
    );

    const [collections, loadingCollections] = useCollections(
        path === '/collections'
    );

    const [statistics, loadingStatistics] = useStatistics(
        path === '/statistics'
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

    const listRef = useRef(null);

    const onRecordCardClick = (record) => {
        setSearchParams({ 'record': record.identifier });
        swapVisibleElement();
    };

    const onStatisticCardClick = (statistic) => {
        setSearchParams({
            'room': statistic.room,
            'start_timestamp': statistic.start_timestamp,
            'end_before_timestamp': statistic.end_before_timestamp
        });
        swapVisibleElement();
    };

    const onCollectionCardClick = (collection) => {
        setSearchParams({ 'collection': collection.identifier });
        swapVisibleElement();
    };

    const formatDateCreated = (recordCreated) => {
        return new Intl.DateTimeFormat(i18n.language, {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date(recordCreated));
    };

    const highlightMatch = (text, searchValue) => {
        if (!text) return null;
        const regex = new RegExp(`(${searchValue})`, 'gi');
        return text.replace(regex, `<span style="background-color: ${Colors.orange}">$1</span>`);
    };

    const highlightRecord = (record, sanitizedSearchValue) => {
        const formattedCreated = formatDateCreated(record.created);
        const { title, description, identifier, duration } = record;
        return {
            ...record,
            formattedCreated,
            highlightedTitle: highlightMatch(title, sanitizedSearchValue),
            highlightedDescription: highlightMatch(description, sanitizedSearchValue),
            highlightedIdentifier: highlightMatch(identifier, sanitizedSearchValue),
            highlightedDuration: highlightMatch(duration, sanitizedSearchValue),
            highlightedCreation: highlightMatch(formattedCreated, sanitizedSearchValue),
        };
    };

    const highlightCollection = (collection, sanitizedSearchValue) => {
        const { title } = collection;
        return {
            ...collection,
            highlightedTitle: highlightMatch(title, sanitizedSearchValue),
        };
    };

    const filterItemsQuery = (items, itemOptions, highlightItem, itemMatchesSearch) => {
        const { searchValue = '' } = itemOptions || {};
        if (typeof searchValue === 'string' && searchValue.trim()) {
            const sanitizedSearchValue = DOMPurify.sanitize(searchValue.toLowerCase());
            const regex = new RegExp(sanitizedSearchValue);
            return items.reduce((filteredItems, item) => {
                const highlightedItem = highlightItem(item, sanitizedSearchValue);
                if (itemMatchesSearch(highlightedItem, sanitizedSearchValue, regex)) {
                    filteredItems.push(highlightedItem);
                }
                return filteredItems;
            }, []);
        } else {
            return items;
        }
    };

    const filterRecordsQuery = (records, recordOptions) => {
        return filterItemsQuery(records, recordOptions, highlightRecord, (highlightedRecord, sanitizedSearchValue, regex) => {
            return regex.test(highlightedRecord.title?.toLowerCase()) ||
                regex.test(highlightedRecord.description?.toLowerCase()) ||
                highlightedRecord.identifier?.toLowerCase() === sanitizedSearchValue ||
                regex.test(highlightedRecord.duration?.toLowerCase()) ||
                regex.test(highlightedRecord.formattedCreated)
        });
    };

    const filterCollectionsQuery = (collections, collectionOptions) => {
        return filterItemsQuery(collections, collectionOptions, highlightCollection, (highlightedCollection, sanitizedSearchValue, regex) => {
            return regex.test(highlightedCollection.title?.toLowerCase());
        });
    };

    const recordCards = filterRecordsQuery(tagFilteredRecords || [], recordOptions).map((record, _i) =>
        [<RecordCard
            key={record.identifier}
            onClick={() => onRecordCardClick(record)}
            record={record}
            selected={record.identifier === searchParams.record }
            containerRef={listRef} />,
            record.identifier]
    );

    const collectionCards = filterCollectionsQuery(sortedCollections || [], collectionOptions).map((collection, i) =>
        [<CollectionCard
            collection={collection}
            selected={collection.identifier === searchParams.collection}
            key={collection.identifier}
            onClick={() => onCollectionCardClick(collection)} 
            containerRef={listRef} />,
            collection.identifier]
    );

    /**
     * Sorts an array of statistics objects based on the start timestamps in descending order.
     *
     * @param {Array} statistics - The array of statistics objects to be sorted.
     * @returns {Array} - The sorted array of statistics objects.
     */
    const sortedStatistics = statistics => {
        if (!Array.isArray(statistics)) {
            return [];
        }
        return statistics.sort((a, b) => b.start_timestamp - a.start_timestamp);
    };

    /**
     * Creates an array of StatisticCard components based on the given statistics array.
     *
     * @param {Array} statistics - The array of statistics objects.
     * @returns {Array} - An array of StatisticCard components.
     */
    const statisticCards = sortedStatistics(statistics).map((statistic, _i) => {
        return [<StatisticCard
            key={statistic.start_timestamp}
            onClick={() => onStatisticCardClick(statistic)}
            selected={
                Number(statistic.room) === Number(searchParams.room)
                && Number(statistic.start_timestamp) === Number(searchParams.start_timestamp)
                && Number(statistic.end_before_timestamp) === Number(searchParams.end_before_timestamp)
            }
            statistic={statistic}/>];
    });

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
        '/records': <RecordListActions
            options={recordOptions}
            onOptionChange={(options) => setRecordOptions(options)}
            tags={{ distinct: distinctRecordTags, selected: selectedTags }}
            onTagChange={onSelectedTagChange}
        />,
        '/collections': <CollectionActions
            options={collectionOptions}
            onOptionChange={(options) => setCollectionOptions(options)}
        />
    };

    const loading = {
        '/records': loadingRecords,
        '/collections': loadingCollections,
        '/statistics': loadingStatistics
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
      <div className="left">
        <div className="left-up">
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
        </div>
        <div ref={listRef} className="left-down border border-top-0 border-black">
            <Loading loading={Boolean(loading[path])}>
              <LeftList 
                currentSortCriteria={sortOptions?.criteria} 
                sortCriterias={sortCriterias} 
                descending={sortOptions?.descending} 
                onSortOptionChange={onSortOptionChange}>
                {(() => {
                  if (listElements[path]?.length > 0) {
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
        </div>
      </div>
  );
};

Left.propTypes = {
};

export default Left;
