import { useTranslation } from "react-i18next";
import useUser from "../useUser";
import HyColors from "../../../src/components/utilities/HyColors";


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
}

const useRecordTags = (record) => {
  const { t } = useTranslation();
  const [user] = useUser();

  const tagFunctions = [deleted(user, t), expiring(t)];

  const tags = tagFunctions
    .map(tagFunction => tagFunction(record))
    .filter(tag => tag);

  return tags;
};

export default useRecordTags;
