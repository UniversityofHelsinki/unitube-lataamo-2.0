import useTagFilter from "../useTagFilter";
import useCollectionTags from "./useCollectionTags";
import useDistinctCollectionTags from "./useDistinctCollectionTags";
import useSelectedCollectionTags from "./useSelectedCollectionTags";

const useCollectionTagFilter = (collections = [], loadingCollections) => {
  const tags = useCollectionTags(collections);

  const distinctTags = useDistinctCollectionTags(
    collections
  );

  const [selectedTags, onSelectedTagChange, clearSelectedTags] = useSelectedCollectionTags(
    distinctTags,
    loadingCollections
  );

  const filteredRecords = useTagFilter(collections, selectedTags, tags);
  
  return [filteredRecords, selectedTags, distinctTags, onSelectedTagChange, clearSelectedTags];
};

export default useCollectionTagFilter;
