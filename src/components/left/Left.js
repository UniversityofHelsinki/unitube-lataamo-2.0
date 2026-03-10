import React, { useState, useRef } from 'react';
import './Left.css';
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
import useRecordSort, {defaultCriterias as recordsDefaultCriterias} from '../../hooks/record/useRecordSort';
import useCollectionSort, {defaultCriterias as collectionsDefaultCriterias}  from '../../hooks/collection/useCollectionSort';
import useRecordTagFilter from '../../hooks/record/useRecordTagFilter';
import useRecordSearch from '../../hooks/record/useRecordSearch';
import useCollectionSearch from '../../hooks/collection/useCollectionSearch';
import { belowBreakpoint, hideLeft, showRight } from '../utilities/visibilities';
import useCollectionTagFilter from '../../hooks/collection/useCollectionTagFilter';
import ListActions from './ListActions';
import PropTypes from "prop-types";
import RecordBulkActions from './bulk/RecordBulkActions';
import useBulkRecordSelect from '../../hooks/useBulkRecordSelect';

import { ReactComponent as Unchecked } from '../utilities/icons/square.svg';
import { ReactComponent as Checked } from '../utilities/icons/square-checked.svg';
import { ReactComponent as AlmostChecked } from '../utilities/icons/Square-indeterminate.svg';

const No = ({ children }) => {
    return (
        <div className="left-no">
            <p>
                {children}
            </p>
        </div>
    );
};

const ErrorAllRecords = () => {
    const { t } = useTranslation();
    return (
        <No>
            {t('left_error_when_reading_records')}
        </No>
    );
};

const ErrorInbox = () => {
    const { t } = useTranslation();
    return (
        <No>
            {t('left_error_when_reading_records')}
        </No>
    );
};

const ErrorTrash = () => {
    const { t } = useTranslation();
    return (
        <No>
            {t('left_error_when_reading_records')}
        </No>
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
    const { t } = useTranslation();
    const [path] = useLocation();

    const [recordOptions, setRecordOptions] = useState({
        searchValue: '',
        showRecordsInCollections: false,
        filtered : false
    });

    const [collectionOptions, setCollectionOptions] = useState({
        searchValue: '',
    });

    const [records, loadingRecords, reloadRecords, error_allrecords, error_inbox, error_trash] = useVisibleRecords({
        showAll: recordOptions.showRecordsInCollections,
        load: path === '/records'
    });

    const [recordSortOptions, setRecordSortOptions] = useState({
        criteria: 'created',
        descending: recordsDefaultCriterias['created']
    });

    const [sortedRecords, recordSortCriterias] = useRecordSort(
        records,
        recordSortOptions.criteria,
        recordSortOptions.descending
    );

    const [
      tagFilteredRecords, 
      selectedRecordTags, 
      distinctRecordTags, 
      onSelectedRecordTagChange,
      clearSelectedRecordTags
    ]  = useRecordTagFilter(
        sortedRecords,
        loadingRecords
    );

    const searchQueryFilteredRecords = useRecordSearch(
      tagFilteredRecords, 
      recordOptions.searchValue
    );

    const {
      selectedRecords, 
      onSelectRecord, 
      canBeSelected: canBeSelectedRecords, 
      toggleSelectedRecords,
      allRecordsSelected
    } = useBulkRecordSelect(searchQueryFilteredRecords);

    const [collectionSortOptions, setCollectionSortOptions] = useState({
        criteria: 'created',
        descending: collectionsDefaultCriterias['created']
    });


    const [collections, loadingCollections, reloadCollections] = useCollections(
        path === '/collections'
    );

    const [sortedCollections, collectionSortCriterias] = useCollectionSort(
        collections,
        collectionSortOptions.criteria,
        collectionSortOptions.descending
    );


    const [
      tagFilteredCollections,
      selectedCollectionTags,
      distinctCollectionTags,
      onSelectedCollectionTagChange,
      clearSelectedCollectionTags
    ] = useCollectionTagFilter(
      sortedCollections,
      loadingCollections
    );

    const searchQueryFilteredCollections = useCollectionSearch(
      tagFilteredCollections,
      collectionOptions.searchValue
    );

    const [statistics, loadingStatistics] = useStatistics(
        path === '/statistics'
    );

    const [searchParams, setSearchParams] = useSearchParams();

    const listRef = useRef(null);

    const onRecordCardClick = (record) => {
        setSearchParams({ 'record': record.identifier });
        if (belowBreakpoint()) {
          hideLeft();
        }
    };

    const onStatisticCardClick = (statistic) => {
        setSearchParams({
            'room': statistic.room,
            'start_timestamp': statistic.start_timestamp,
            'end_before_timestamp': statistic.end_before_timestamp
        });
        if (belowBreakpoint()) {
          hideLeft();
        }
    };

    const onCollectionCardClick = (collection) => {
        setSearchParams({ 'collection': collection.identifier });
        if (belowBreakpoint()) {
          hideLeft();
        }
    };

    const recordCards = (searchQueryFilteredRecords || []).map((record, _i) =>
        [<RecordCard
            key={record.identifier}
            onClick={() => onRecordCardClick(record)}
            record={record}
            selected={record.identifier === searchParams.record}
            containerRef={listRef}
            highlight={recordOptions.searchValue} 
          />,
            record.identifier]
    );

    const collectionCards = (searchQueryFilteredCollections || []).map((collection, i) =>
        [<CollectionCard
            collection={collection}
            selected={collection.identifier === searchParams.collection}
            key={collection.identifier}
            onClick={() => onCollectionCardClick(collection)} 
            containerRef={listRef}
            highlight={collectionOptions.searchValue} />,
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

    const selectedElements = {
      '/records': selectedRecords
    };

    const selectableElements = {
      '/records': canBeSelectedRecords
    };

    const onSelectElement = {
      '/records': onSelectRecord
    };

    const canBeSelected = {
      '/records': canBeSelectedRecords
    };

    const actionElement = {
        '/records': <RecordListActions
            options={recordOptions}
            onOptionChange={(options) => setRecordOptions(options)}
            tags={{ distinct: distinctRecordTags, selected: selectedRecordTags }}
            onTagChange={onSelectedRecordTagChange}
            onTagClear={clearSelectedRecordTags}
            selectedTags={selectedRecordTags}
        />,
        '/collections': <CollectionActions
            options={collectionOptions}
            onOptionChange={(options) => setCollectionOptions(options)}
            tags={{ distinct: distinctCollectionTags, selected: selectedCollectionTags }}
            onTagChange={onSelectedCollectionTagChange}
            onTagClear={clearSelectedCollectionTags}
            selectedTags={selectedCollectionTags}
        />
    };

    const showBulkActions = {
      '/records': searchQueryFilteredRecords.length > 0 && selectableElements[path]?.length > 0 
    };

    const bulkActions = {
      '/records': <RecordBulkActions 
        records={searchQueryFilteredRecords} 
        selectedRecords={selectedRecords} 
      />
    };

    const loading = {
        '/records': loadingRecords,
        '/collections': loadingCollections,
        '/statistics': loadingStatistics
    };

    const errorAllrecords = {
        '/records': error_allrecords,
    }

    const errorInbox = {
        '/records': error_inbox,
    }

    const errorTrash = {
        '/records': error_trash,
    }

    const sortOptions = {
        '/records': recordSortOptions,
        '/collections': collectionSortOptions
    }[path];

    const sortCriterias = {
        '/records': recordSortCriterias,
        '/collections': collectionSortCriterias
    }[path];

    const reloadFunction = {
        '/records': reloadRecords,
        '/collections': reloadCollections,
    }[path];

    const onSortOptionChange = async (criteria, descending) => {
        if (sortOptions === recordSortOptions) {
            const criteriaChanged = criteria !== recordSortOptions.criteria;
            const direction = criteriaChanged ? recordsDefaultCriterias[criteria] : descending;
            setRecordSortOptions({ ...recordSortOptions, criteria, descending:direction });
        }
        if (sortOptions === collectionSortOptions) {
            const criteriaChanged = criteria !== collectionSortOptions.criteria;
            const direction = criteriaChanged ? collectionsDefaultCriterias[criteria] : descending;
            setCollectionSortOptions({ ...collectionSortOptions, criteria, descending:direction });
        }
    };

  return (
      <div className="left">
        <div className="left-navigation">
          <Navigation />
        </div>
        <div className="left-content" ref={listRef}>
          <div>
            {actionElement[path]}
          </div>
          <div className="left-content-list-actions">
            <div className="shadow-line">
              <ListActions 
                currentSortCriteria={sortOptions?.criteria}
                sortCriterias={sortCriterias}
                descending={sortOptions?.descending}
                onSortOptionChange={onSortOptionChange}
                reload={reloadFunction}
              />
            </div>
            {showBulkActions[path] &&
              <div className="bulk-actions shadow-line">
                <div className="bulk-actions-information">
                  <button className="bulk-actions-select-all" onClick={toggleSelectedRecords} disabled={!selectableElements[path].length}>
                    <span>{t('bulk_actions_select_all')}</span>
                    <span className="me-1"></span>
                    <div aria-hidden="true">
                      {(() => {
                        if (allRecordsSelected && selectedRecords.size > 0) {
                          return <Checked />;
                        } else if (selectedRecords.size > 0) {
                          return <AlmostChecked />;
                        }
                        return <Unchecked />;
                      })()}
                    </div>
                  </button>
                </div>
              </div>
            }
          </div>
          <div className="left-down">
            <Loading loading={Boolean(loading[path])}>
              <LeftList 
                selected={selectedElements[path]} 
                onSelect={onSelectElement[path]} 
                canBeSelected={canBeSelected[path]}
              >
                {(() => {
                  if (errorAllrecords[path]) {
                      return [[
                          <ErrorAllRecords />
                      ]]
                  }
                  if (errorInbox[path]) {
                      return [[
                          <ErrorInbox/>
                      ]]
                  }
                    if (errorTrash[path]) {
                        return [[
                            <ErrorTrash/>
                        ]]
                    }
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
        {showBulkActions[path] && <div className="left-bottom">
          <div>
            {bulkActions[path]}
          </div>
          {selectableElements[path].length > 0 &&
            <div
              className={selectedElements[path].size === 0 ? 'left-bottom-not-selected' : ''} 
            >
              <span className="screenreader-only" aria-live="assertive">
                {t('left_bulk_actions_select', { count: selectedElements[path].size })}
              </span>
              <span aria-hidden>{selectedElements[path].size}/{selectableElements[path].length}</span>
            </div>
          }
        </div>}
      </div>
  );
};

Left.propTypes = {
};

export default Left;
