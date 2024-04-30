import useSearch, { partialMatch } from "../useSearch";

const properties = {
  title: partialMatch,
};

const useCollectionSearch = (collections = [], searchQuery = '') => {

  const filteredCollections = useSearch(collections, searchQuery, properties, {});

  return filteredCollections;
  
};

export default useCollectionSearch;
