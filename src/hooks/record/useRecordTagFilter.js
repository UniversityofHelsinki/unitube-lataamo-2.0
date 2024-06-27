import useTagFilter from "../useTagFilter";
import useDistinctRecordTags from "./useDistinctRecordTags";
import useRecordTags from "./useRecordTags";
import useSelectedRecordTags from "./useSelectedRecordTags";

const useRecordTagFilter = (records = [], loadingRecords) => {
  const tags = useRecordTags(records);

  const distinctTags = useDistinctRecordTags(tags);

  const [selectedTags, onSelectedTagChange, clearSelectedTags] = useSelectedRecordTags(
    distinctTags,
    loadingRecords
  );

  const filteredRecords = useTagFilter(records, selectedTags, tags);

  return [filteredRecords, selectedTags, distinctTags, onSelectedTagChange, clearSelectedTags];

};

export default useRecordTagFilter;
