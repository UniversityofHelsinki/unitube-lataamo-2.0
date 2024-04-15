import { integerComparator, stringComparator } from "../../components/utilities/comparators";
import useSort from "../useSort";

const createdComparator = (descending) => (a, b) => {
  const aCreated = a.created ? new Date(a.created).getTime() : 0;
  const bCreated = b.created ? new Date(b.created).getTime() : 0;
  const order = integerComparator(aCreated, bCreated);
  return descending ? -order : order;
};

const titleComparator = (descending) => (a, b) => {
  const order = stringComparator(a.title, b.title);
  return descending ? -order : order;
};

const comparators = {
  created: createdComparator,
  title: titleComparator
};

const useCollectionSort = (collections, criteria, descending) => {
  const [sortedCollections, supportedCriterias] = useSort(comparators, collections, criteria, descending);

  return [sortedCollections, supportedCriterias];
};

export default useCollectionSort;

