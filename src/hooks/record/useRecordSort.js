import { integerComparator, stringComparator } from "../../components/utilities/comparators";
import useSort from "../useSort";
import useUser from "../useUser";

const titleComparator = (descending) => {
  return (a, b) => {
    const order = stringComparator(a.title, b.title);
    return descending ? -order : order;
  };
};

const seriesComparator = (eppn) => (descending) => {
  const inboxTitle = `inbox ${eppn}`; //move inbox ${eppn} video first in videolist
  const trashTitle = `trash ${eppn}`; //move trash ${eppn} video last in videolist

  return (a, b) => {
    if (a.series === inboxTitle && b.series !== inboxTitle) {
      return descending ? 1 : -1;
    }

    if (a.series === trashTitle && b.series !== trashTitle) {
      return descending ? -1 : 1;
    }

    const order = stringComparator(a.series, b.series);
    if (order === 0) {
      return stringComparator(a.title, b.title);
    }
    return descending ? -order : order;
  };
};

const createdComparator = (descending) => {
  return (a, b) => {
    const aCreated = a.created ? new Date(a.created).getTime() : 0;
    const bCreated = b.created ? new Date(b.created).getTime() : 0;
    const order = integerComparator(aCreated, bCreated);
    return descending ? -order : order;
  };
};

const deletionDateComparator = (descending) => {
  return (a, b) => {
    const aDeletionDate = a.deletionDate ? new Date(a.deletionDate).getTime() : 0;
    const bDeletionDate = b.deletionDate ? new Date(b.deletionDate).getTime() : 0;
    const order = integerComparator(aDeletionDate, bDeletionDate);
    return descending ? -order : order;
  };
};

const visibilityComparator = (descending) => {
  return (a, b) => {
    const tagOrder = ['status_private', 'status_unlisted', 'status_published'];
    const aVisibility = tagOrder.indexOf(a.visibility.find(v => tagOrder.includes(v)));
    const bVisibility = tagOrder.indexOf(b.visibility.find(v => tagOrder.includes(v)));
    const order = aVisibility - bVisibility;
    return descending ? -order : order;
  };
};

const comparators = (eppn) => ({
  title: titleComparator,
  series: seriesComparator(eppn),
  created: createdComparator,
  deletionDate: deletionDateComparator,
  visibility: visibilityComparator
});

export const defaultCriterias = {
  title: false,
  series: false,
  created: true,
  deletionDate: false,
  visibility: false
}

const useRecordSort = (records, criteria, descending) => {
  const [user] = useUser();
  const eppn = user.eppn;
  const [sortedRecords, supportedCriterias] = useSort(comparators(eppn), records, criteria, descending);

  return [sortedRecords, supportedCriterias];
};

export default useRecordSort;
