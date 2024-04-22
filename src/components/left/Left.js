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

    const onRecordCardClick = (record) => {
        setSearchParams({ 'record': record.identifier });
    };

    const onStatisticCardClick = (statistic) => {
        setSearchParams({
            'room': statistic.room,
            'start_timestamp': statistic.start_timestamp,
            'end_before_timestamp': statistic.end_before_timestamp
        });
    };

    const onCollectionCardClick = (collection) => {
        setSearchParams({ 'collection': collection.identifier });
    };


    /**
     * Highlights the matching search value in the given text by wrapping it in a <span> element with a background color.
     *
     * @param {string} text - The input text to be highlighted.
     * @param {string} searchValue - The search value to be highlighted in the text.
     * @returns {string} - The modified text with the matching search value highlighted.
     */
    const highlightMatch = (text, searchValue) => {
        if (!text) return null;

        const regex = new RegExp(`(${searchValue})`, 'gi');
        return text.replace(regex, `<span style="background-color: ${Colors.orange}">$1</span>`);
    };

    /**
     * Highlights a record based on a sanitized search value.
     *
     * @param {Object} record - The record to highlight.
     * @param {string} sanitizedSearchValue - The sanitized search value.
     *
     * @returns {Object} - The highlighted record.
     */
    const highlightRecord = (record, sanitizedSearchValue) => {
        const formattedCreated = new Intl.DateTimeFormat(i18n.language, {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date(record.created));
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


    /**
     * Highlights a match in the title of a collection using a sanitized search value.
     * @param {Object} collection - The collection object.
     * @param {string} sanitizedSearchValue - The sanitized search value.
     * @returns {Object} - The modified collection object with highlightedTitle property.
     */
    const highlightCollection = (collection, sanitizedSearchValue) => {
         const { title } = collection;
        return {
            ...collection,
            highlightedTitle: highlightMatch(title, sanitizedSearchValue),
        };
    };

    /**
     * Filters an array of items based on the given options.
     *
     * @param {array} items - The array of items to filter.
     * @param {object} itemOptions - The options to use for filtering.
     * @param {function} handleHighlight - Function to handle the item highlighting.
     * @param {function} handleCheck - Function to handle the item checking.
     *
     * @returns {array} - The filtered array of items.
     */
    const filterItemsQuery = (items, itemOptions, handleHighlight, handleCheck) => {
        const { searchValue = '' } = itemOptions || {};
        if (typeof searchValue === 'string' && searchValue.trim()) {
            const sanitizedSearchValue = DOMPurify.sanitize(searchValue.toLowerCase());
            const regex = new RegExp(sanitizedSearchValue);
            // Iterate over items only once
            return items.reduce((filteredItems, item) => {
                // Highlight the item
                const highlightedItem = handleHighlight(item, sanitizedSearchValue);
                // Filter and Insert item to the result if it passes the condition
                if (handleCheck(highlightedItem, sanitizedSearchValue, regex)) {
                    filteredItems.push(highlightedItem);
                }
                return filteredItems;
            }, []);
        } else {
            return items;
        }
    };

    /**
     * Filters an array of records based on the given options.
     *
     * @param {array} records - The array of records to filter.
     * @param {object} recordOptions - The options to use for filtering.
     * @returns {array} - The filtered array of records.
     */
    const filterRecordsQuery = (records, recordOptions) => {
        return filterItemsQuery(records, recordOptions, highlightRecord, (highlightedRecord, sanitizedSearchValue, regex) => {
            return regex.test(highlightedRecord.title?.toLowerCase()) ||
                regex.test(highlightedRecord.description?.toLowerCase()) ||
                highlightedRecord.identifier?.toLowerCase() === sanitizedSearchValue ||
                regex.test(highlightedRecord.duration?.toLowerCase()) ||
                regex.test(highlightedRecord.formattedCreated)
        });
    };

    /**
     * Filters an array of collections based on the given options.
     *
     * @param {array} collections - The array of collections to filter.
     * @param {object} collectionOptions - The options to use for filtering.
     * // @returns {array} - The filtered array of collections.
     */
    const filterCollectionsQuery = (collections, collectionOptions) => {
        return filterItemsQuery(collections, collectionOptions, highlightCollection, (highlightedCollection, _, regex) => {
            return regex.test(highlightedCollection.title?.toLowerCase());
        });
    };

    const recordCards = filterRecordsQuery(tagFilteredRecords || [], recordOptions).map((record, _i) =>
        [<RecordCard
            key={record.identifier}
            onClick={() => onRecordCardClick(record)}
            record={record}
            selected={record.identifier === searchParams.record }/>,
            record.identifier]
    );

    const collectionCards = filterCollectionsQuery(sortedCollections || [], collectionOptions).map((collection, i) =>
        [<CollectionCard
            collection={collection}
            selected={collection.identifier === searchParams.collection}
            key={collection.identifier}
            onClick={() => onCollectionCardClick(collection)} />,
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
