import { useTranslation } from "react-i18next";
import useUser from "../useUser";
import useVideos from "../useVideos";
import { STATUS } from '../../Constants.js';
import record from "../../components/record/Record";


const deleted = (user, t) => (record) => {
  const isInTrash = record.series === `trash ${user.eppn}`;
  if (isInTrash) {
    return {
      label: t('tag_deleted'),
      color: 'red'
    };
  }
  return null;
};

const expiring = (t) => (record) => {
  // Parse the deletionDate string into a Date object
  const deletionDateObject = new Date(record.deletionDate);
  // Calculate the date three months from now
  const threeMonthsFromNow = new Date();
  threeMonthsFromNow.setMonth(threeMonthsFromNow.getMonth() + 3);

  // Check if the deletionDate is three months from now or less
  const isDeletionDateNear = deletionDateObject <= threeMonthsFromNow;

  if (isDeletionDateNear) {
    return {
      label: t('tag_expiring'),
      color: 'orange'
    };
  }
};

const cc = (t) => record => {
  const videos = useVideos(record.identifier);
  const subtitles = videos?.map((video) => video.vttFile).filter(file => file !== undefined && file !== '');
  if (subtitles && subtitles.length > 0) {
    return {
      label: t('tag_cc'),
      color: 'green'
    };
  }
};


const statusLabelMap = {
  [STATUS.PRIVATE.toLowerCase()]: { label: 'tag_private', color: 'blue' },
  [STATUS.PUBLISHED.toLowerCase()]: { label: 'tag_published', color: 'blue' },
  [STATUS.UNLISTED.toLowerCase()]: { label: 'tag_unlisted', color: 'blue' },
  [STATUS.MOODLE.toLowerCase()]: { label: 'tag_moodle', color: 'brightblue' }
};

const createStatusObject = (statusObj, t) => {
  return {
    label: t(statusObj.label),
    color: statusObj.color
  };
};

const status = (t) => record => {
  let statuses = [];
  if (record.visibility && record.visibility.length > 0) {
    for (const visibility of record.visibility) {
      const visibilityLowerCase = visibility.toLowerCase();
      const statusObj = statusLabelMap[visibilityLowerCase];

      if (statusObj) {
        statuses.push(createStatusObject(statusObj, t));
      }
    }
  }
  return statuses;
};

const useRecordTags = (record) => {
  const { t } = useTranslation();
  const [user] = useUser();

  const tagFunctions = [deleted(user, t), expiring(t), cc(t), status(t)];

  const tags = tagFunctions
      .flatMap(tagFunction => tagFunction(record))
      .filter(tag => tag);

  return tags;
};

export default useRecordTags;
