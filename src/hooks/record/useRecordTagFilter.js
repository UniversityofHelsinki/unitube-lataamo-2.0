import useTagFilter from "../useTagFilter";
import useDistinctRecordTags from "./useDistinctRecordTags";
import useRecordTags from "./useRecordTags";
import useSelectedRecordTags from "./useSelectedRecordTags";

const useRecordTagFilter = (records = []) => {
  const tags = useRecordTags(records);

  const distinctTags = useDistinctRecordTags(records);

  const [selectedTags, onSelectedTagChange, clearSelectedTags] = useSelectedRecordTags(
    distinctTags
  );

  const filteredRecords = useTagFilter(records, selectedTags, tags);

  return [filteredRecords, selectedTags, distinctTags, onSelectedTagChange, clearSelectedTags];

};

export default useRecordTagFilter;
