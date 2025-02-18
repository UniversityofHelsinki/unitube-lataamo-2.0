import React from 'react';
import PropTypes from 'prop-types';
import './CollectionCardRecord.css';
import Thumbnail from "../../utilities/Thumbnail";
import useSearchParams from "../../../hooks/useSearchParams";
import onKeyDown from "../../accessibility/keydown";
import { belowBreakpoint, hideLeft } from '../../utilities/visibilities';

const CollectionCardRecord = ({ record, containerRef }) => {
    const [searchParameters, setSearchParams] = useSearchParams();

    const openRecord = (event) => {
        event.preventDefault();
        if (belowBreakpoint()) {
          hideLeft();
        }
        setSearchParams({
            record: record.id
        });
    };

    const selected = searchParameters?.record === record?.id;
    const selectedClass = selected ? 'collection-card-record-selected' : '';

  return (
    <div className={`collection-card-record ${selectedClass}`}>
      <div className="collection-card-record-thumbnail" aria-hidden>
        <Thumbnail width="40" height="40" record={{ ...record, identifier: record.id }} altText={'record_thumbnail_alt_text'} containerRef={containerRef}/>
      </div>
      <div className="collection-card-record-details">
        <a href={`?record=${record.id}`} onClick={openRecord} onKeyDown={onKeyDown(openRecord)}>
          {record.title}
        </a>
      </div>
    </div>
  );
};

CollectionCardRecord.propTypes = {
  record: PropTypes.object.isRequired
};

export default CollectionCardRecord;
