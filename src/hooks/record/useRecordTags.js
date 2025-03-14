import useUser from "../useUser";
import { JOB_STATUS_STARTED, JOB_TYPES_TRANSCRIPTION, STATUS } from '../../Constants.js';
import useRecordsValidation from "../validation/record/useRecordsValidation";
import { useState } from "react";


/**
 * Returns an object indicating if a record is deleted.
 *
 * @param {object} user - The user object.
 * @param {object} t - The translation object.
 * @returns {function} - A function that accepts a record and returns an object.
 */
const deleted = (user) => (record) => {
  const isInTrash = record.series === `trash ${user.eppn}`;
  if (isInTrash) {
    return {
      label: 'tag_deleted',
      ariaLabel: 'tag_deleted_aria',
      color: 'red'
    };
  }
  return null;
};

/**
 * Determines if a record is expiring based on the deletion date.
 *
 * @param {Function} t - The translation function.
 * @return {Function} - A function that takes a record and returns an object representing the status.
 */
const expiring = () => (record) => {
  // Parse the deletionDate string into a Date object
  const deletionDateObject = new Date(record.deletionDate);
  // Calculate the date three months from now
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

  // Check if the deletionDate is three months from now or less
  const isDeletionDateNear = deletionDateObject <= threeMonthsFromNow;

  if (isDeletionDateNear) {
    return {
      label: 'tag_expiring',
      ariaLabel: 'tag_expiring_aria',
      color: 'orange'
    };
  }
};

export const processing = () => (record) => {
  const processingRecord = record.processing_state === 'RUNNING' || record.processing_state === 'EVENTS.EVENTS.STATUS.PROCESSING';
  const processingSubtitles = record.jobs && record.jobs.type === JOB_TYPES_TRANSCRIPTION && record.jobs.status === JOB_STATUS_STARTED;
  const hasNoDownloadableMedia = !record.downloadableMedia || Object.values(record.downloadableMedia).length === 0;

  if (processingRecord || processingSubtitles || hasNoDownloadableMedia) {
    return {
      label: 'tag_processing',
      ariaLabel: 'tag_processing_aria',
      color: 'orange'
    };
  }
};

const cc = (t) => record => {
  if (record.subtitles) {
    return {
      label: 'tag_cc',
      ariaLabel: 'tag_cc_aria',
      color: 'green'
    };
  }
};


/**
 * A map of status labels with their corresponding colors.
 *
 * @typedef {Object} StatusLabelMap
 * @property {Object} private - The label and color for the "private" status.
 * @property {string} private.label - The label for the "private" status.
 * @property {string} private.color - The color for the "private" status.
 * @property {Object} published - The label and color for the "published" status.
 * @property {string} published.label - The label for the "published" status.
 * @property {string} published.color - The color for the "published" status.
 * @property {Object} unlisted - The label and color for the "unlisted" status.
 * @property {string} unlisted.label - The label for the "unlisted" status.
 * @property {string} unlisted.color - The color for the "unlisted" status.
 * @property {Object} moodle - The label and color for the "moodle" status.
 * @property {string} moodle.label - The label for the "moodle" status.
 * @property {string} moodle.color - The color for the "moodle" status.
 */
const statusLabelMap = {
  [STATUS.PRIVATE.toLowerCase()]: { label: 'tag_private', color: 'blue' },
  [STATUS.PUBLISHED.toLowerCase()]: { label: 'tag_published', color: 'blue' },
  [STATUS.UNLISTED.toLowerCase()]: { label: 'tag_unlisted', color: 'blue' },
  [STATUS.MOODLE.toLowerCase()]: { label: 'tag_moodle', color: 'grey' }
};

/**
 * Creates a status object with a translated label and color.
 * @param {Object} statusObj - The status object containing the label and color.
 * @param {function} t - The translation function.
 * @returns {Object} - The status object with translated label and color.
 */
const createStatusObject = (statusObj) => {
  return {
    label: statusObj.label,
    ariaLabel: `record_${statusObj.label}_aria`,
    color: statusObj.color
  };
};

/**
 * Retrieves the status of a record based on its visibility.
 *
 * @param {Object} t - The translation helper object.
 * @returns {Array} - An array of status objects.
 */
const status = () => (record) => {
  let statuses = [];
  if (record.visibility && record.visibility.length > 0) {
    for (const visibility of record.visibility) {
      const visibilityLowerCase = visibility.toLowerCase();
      const statusObj = statusLabelMap[visibilityLowerCase];

      if (statusObj) {
        statuses.push(createStatusObject(statusObj));
      }
    }
  }
  return statuses;
};

/**
 * Validates given fields
 *
 * @param t
 * @param isValid
 * @returns {(function(*): ({color: string, label: *}|undefined))|*}
 */
const missingDetails = (isValids) => (_record, i) => {

  if (!isValids[i]) {
    return {
      label: 'tag_validation_failed',
      ariaLabel: 'record_tag_validation_failed_aria',
      color: 'red'
    };
  }
}

const recordsDiffer = (previousRecords, records) => {
  const previousIdentifiers = previousRecords.map(pr => pr.identifier);
  const identifiers = records.map(r => r.identifier);
  if (previousIdentifiers.length !== identifiers.length) {
    return true;
  }
  for (let i = 0; i < previousIdentifiers.length; i++) {
    if (identifiers[i] !== previousIdentifiers[i]) {
      return true;
    }
  }
  return false;
};

/**
 * Returns an array of tags based on the provided record.
 *
 * @param {Object} record - The record to be used.
 * @returns {Array} An array of tags.
 */
const useRecordTags = (records = []) => {
  const [user] = useUser();
  const [isValids, _messages, validate] = useRecordsValidation(
    ['title', 'description', 'license', 'deletionDate'],
    records
  );
  const [previouslyValidatedRecords, setPreviouslyValidatedRecords] = useState([]);

  if (recordsDiffer(previouslyValidatedRecords, records)) {
    setPreviouslyValidatedRecords(records);
    validate(records);
  }

  const deletedRecordsTags = [
    deleted(user)
  ];

  const tagFunctions = [
    processing(), 
    expiring(), 
    missingDetails(isValids),
    cc(), 
    status(),
  ];
  
  const tags = records.map((record, i) => {
    const recordIsDeleted = record.series === `trash ${user.eppn}`;
    return (recordIsDeleted ? deletedRecordsTags : tagFunctions)
      .flatMap((tagFunction) => tagFunction(record, i))
      .filter(tag => tag);
  });

  return tags;
};

export default useRecordTags;
