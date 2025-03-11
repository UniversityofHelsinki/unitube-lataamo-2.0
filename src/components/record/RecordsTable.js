import React, {useState} from 'react';
import PropTypes from 'prop-types';
import './RecordsTable.css';
import { useTranslation } from 'react-i18next';
import Thumbnail from '../utilities/Thumbnail';
import useSearchParams from '../../hooks/useSearchParams';
import { Button } from 'react-bootstrap';
import HyCheckBox from '../form/CheckBox';
import useClipboard from '../../hooks/useClipboard';
import { ReactComponent as CopyIcon } from '../utilities/icons/copy.svg';
import { ReactComponent as CaretUp } from '../utilities/icons/caret-up.svg';
import { ReactComponent as CaretDown } from '../utilities/icons/caret-down.svg';
import { RECORD_EMBED_CODE } from '../../Constants';
import DateView from '../utilities/DateView';
import { integerComparator, stringComparator } from '../utilities/comparators';
import { useId } from 'react';
import { useNotification } from '../notification/NotificationContext';

const isoStringComparator = (a, b) => {
  const aEpoch = a ? new Date(a) : 0;
  const bEpoch = b ? new Date(b) : 0;
  return integerComparator(aEpoch, bEpoch);
};

const propertyComparator = (property, direction) => (a, b) => {

  const comparators = {
    created: isoStringComparator,
    deletion_date: isoStringComparator
  };

  const comparator = comparators[property] || stringComparator;

  const results = comparator(a[property], b[property]);
  if (direction === 'descending') {
    return -results;
  }
  return results;
};

const RecordTitle = ({ record, containerRef, linkDisabled = false }) => {
  const [_searchParams, setSearchParams] = useSearchParams();

  const openRecord = (event) => {
    setSearchParams({
      record: record.id
    });
  };

  const onLinkClick = (event) => {
    event.preventDefault();
    openRecord();
  };

  return (<div className="records-table-title">
    <div style={{ minWidth: '40px', minHeight: '40px' }} aria-hidden="true">
      <Thumbnail 
        record={{ ...record, identifier: record.id }} 
        width="40" 
        height="40" 
        containerRef={containerRef} 
        altText="record_thumbnail_alt_text" />
    </div>
    {linkDisabled && <span className="records-table-title-label">{record.title}</span> || <a 
      href={`?record=${record.id}`} 
      onClick={onLinkClick}
    >
      {record.title}
    </a>}
  </div>);
};

const CheckBox = ({ onChange, checked, indeterminate, disabled, ...rest }) => {
  const id = useId();

  return (<div className="records-table-checkbox">
    <HyCheckBox 
      id={id}
      disabled={disabled} 
      type="checkbox" 
      checked={checked} 
      indeterminate={indeterminate}
      onChange={onChange} 
      { ...rest }
    />
  </div>);
};

const SortButton = ({ children = [], direction, onDirectionChange }) => {

  const directions = new Set(['ascending', 'descending']);

  const reverseDirections = {
    'ascending': 'descending',
    'descending': 'ascending'
  };

  const onClick = (event) => {
    event.preventDefault();
    onDirectionChange(reverseDirections[direction] || 'ascending');
  };

  const directionIcons = {
    'ascending': CaretUp,
    'descending': CaretDown,
  };

  const DirectionIcon = directionIcons[direction];
  const noDirectionIcon = <CaretUp className="records-table-no-direction" />

  return <button className="records-table-sort-button" onClick={onClick}>
    <span>{children}</span>
    {directions.has(direction) && <DirectionIcon /> || noDirectionIcon}
  </button>
};

const SortTh = ({ children = [], direction, onDirectionChange }) => {
  return (<th>
    <SortButton direction={direction} onDirectionChange={onDirectionChange}>
      {children}
    </SortButton>
  </th>);
};

let formattedTimesArray = [];

const getTotalTime =() => {
  let totalSeconds = 0;

  for (let time of formattedTimesArray) {
    let [hours, minutes, seconds] = time.split(':').map(Number);
    totalSeconds += hours * 3600 + minutes * 60 + seconds;
  }

  let hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
  let minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
  let seconds = (totalSeconds % 60).toString().padStart(2, '0');
  if (isNaN(hours) && isNaN(hours) &&isNaN(hours)) {
    return '_'.repeat(10);
  }
  return `${hours}:${minutes}:${seconds}`;
}

const formatDuration = (milliseconds) => {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let hours = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    let minutes = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    let seconds = (totalSeconds % 60).toString().padStart(2, '0');

    formattedTimesArray.push(`${hours}:${minutes}:${seconds}`);

    return `${hours}:${minutes}:${seconds}`;
}

const RecordsTable = ({ 
  records,
  selectedRecords = [],
  onSelect,
  disabled,
  caption = 'records',
  copyVisible = true,
  containerRef,
  showSeries = false,
  showDuration = false,
}) => {
  const { t } = useTranslation();
  const [copy] = useClipboard();
  const [sortOpts, setSortOpts] = useState({ 
    criteria: 'title',
    direction: 'ascending'
  });

  const { setNotification } = useNotification();

  const selectItem = (i) => {
    if (selectedRecords.includes(i)) {
      onSelect(selectedRecords.filter(si => si !== i));
    } else {
      onSelect([ ...selectedRecords, i ]);
    }
  };

  const allSelected = selectedRecords.length === records.length;
  const someSelected = selectedRecords.length > 0 && !allSelected;

  const selectAll = () => {
    if (allSelected) {
      onSelect([]);
    } else {
      onSelect(records.map((_, i) => i));
    }
  };

  const translateSeries = (record) => {
    record.series = 
      new RegExp('^inbox \\w+$').test(record.series) ? t('collections_default') : record.series;
    return record;
  };
  formattedTimesArray = [];
  const getTextWithBreaks = (headerKey) => {
    return t(headerKey).split('<br>').map((text, index) => (
        <React.Fragment key={index}>
          {text}
          {index !== 1 && <br />}
        </React.Fragment>
    ));
  };

  return (
    <table className="records-table">
      <caption className="screenreader-only">
        {t(caption || 'records')}
      </caption>
      <thead className="records-table-heading">
      <tr>
        <th>
          <div className="records-table-heading-checkbox">
            <CheckBox
                onChange={selectAll}
                checked={allSelected}
                indeterminate={someSelected}
                disabled={disabled}
                label={t('records_table_select_all')}
            />
          </div>
        </th>
        {['title', 'created', 'deletion_date'].map((key) => (
            <SortTh
                key={key}
                direction={sortOpts.criteria === key ? sortOpts.direction : ''}
                onDirectionChange={(direction) => setSortOpts({criteria: key, direction})}>
              {getTextWithBreaks(`records_table_${key}`)}
            </SortTh>
        ))}
        {showDuration && <th>{t('records_table_video_length')}</th>}
        {showSeries &&
            <SortTh
                direction={sortOpts.criteria === 'series' ? sortOpts.direction : ''}
                onDirectionChange={(direction) => setSortOpts({criteria: 'series', direction})}>
              {t(`records_table_series`)}
            </SortTh>
        }
        {copyVisible && <th>
          {t(`records_table_embed_code`)}
        </th>}
      </tr>
      </thead>
      <tbody>
      {[...records]
          .map(translateSeries)
          .sort(propertyComparator(sortOpts.criteria, sortOpts.direction))
          .map((record, index) => {
            return (
                <tr key={record.id || record.identifier} className="records-table-row">
                  <td>
                    <CheckBox
                        onChange={() => selectItem(records.indexOf(record))}
                        checked={selectedRecords.includes(records.indexOf(record))}
                        disabled={disabled}
                        label={t('records_table_select', {record: record.title})}
                    />
                  </td>
                  <td>
                    <RecordTitle record={record} containerRef={containerRef} linkDisabled={disabled}/>
                  </td>
                  <td><DateView ISO={record.created}/></td>
                  <td><DateView ISO={record.deletion_date}/></td>
                  {showDuration && <td>{formatDuration(record.publications[0]?.media[0]?.duration)}</td>}
                  {showSeries &&
                      <td>
                <span>
                  {record.series}
                </span>
                      </td>
                  }
                  {copyVisible &&
                      <td>
                        <Button
                            variant="link"
                            onClick={() => {
                              copy(RECORD_EMBED_CODE(record.id));
                              setNotification(t('clipboard_copied_to_clipboard'), 'success', true);
                            }}
                            aria-label={t('records_table_embed_code_aria', {record: record.title})}
                            title={t('records_table_embed_code_aria', {record: record.title})}
                        >
                          <CopyIcon width="1.5em" height="1.5em"/>
                          <span className="screenreader-only">{t('clipboard_copy')}</span>
                        </Button>
                      </td>}
                </tr>
            );
          })}
      </tbody>
      {showDuration &&
          <tr>
            <td></td>
            <td></td>
            <td></td>
            <td className="records-table-total-text">{t('records_table_in_total')}</td>
            <td className={getTotalTime().startsWith('_') ? 'records-table-total-not-ready' : 'records-table-total'}>
               {getTotalTime()}
            </td>
            <td></td>
          </tr>
      }
    </table>
  );
};

RecordsTable.propTypes = {
  records: PropTypes.array,
  disabled: PropTypes.bool,
  onRecordSelect: PropTypes.func,
  containerRef: PropTypes.object
};

export default RecordsTable;
