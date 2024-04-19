import { integerComparator, stringComparator } from "../../components/utilities/comparators";
import useSort from "../useSort";

const titleComparator = (descending) => {
  return (a, b) => {
    const order = stringComparator(a.title, b.title);
    return descending ? -order : order;
  };
};

const seriesComparator = (descending) => {
  return (a, b) => {
    const order = stringComparator(a.series, b.series);
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

const comparators = {
  title: titleComparator,
  series: seriesComparator,
  created: createdComparator,
  deletionDate: deletionDateComparator,
  visibility: visibilityComparator
};

const useRecordSort = (records, criteria, descending) => {
  const [sortedRecords, supportedCriterias] = useSort(comparators, records, criteria, descending);

  return [sortedRecords, supportedCriterias];
};

export default useRecordSort;
