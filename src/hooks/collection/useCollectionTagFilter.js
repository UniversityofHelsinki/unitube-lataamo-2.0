import useTagFilter from "../useTagFilter";
import useCollectionTags from "./useCollectionTags";
import useDistinctCollectionTags from "./useDistinctCollectionTags";
import useSelectedCollectionTags from "./useSelectedCollectionTags";

const useCollectionTagFilter = (collections = []) => {
  const tags = useCollectionTags(collections);

  const distinctTags = useDistinctCollectionTags(
    collections
  );

  const [selectedTags, onSelectedTagChange] = useSelectedCollectionTags(
    distinctTags
  );

  const filteredRecords = useTagFilter(collections, selectedTags, tags);
  
  return [filteredRecords, selectedTags, distinctTags, onSelectedTagChange];
};

export default useCollectionTagFilter;
