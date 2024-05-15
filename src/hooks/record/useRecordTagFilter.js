import useTagFilter from "../useTagFilter";
import useDistinctRecordTags from "./useDistinctRecordTags";
import useRecordTags from "./useRecordTags";
import useSelectedRecordTags from "./useSelectedRecordTags";

const useRecordTagFilter = (records = []) => {
  const tags = useRecordTags(records);

  const distinctTags = useDistinctRecordTags(records);

  const [selectedTags, onSelectedTagChange] = useSelectedRecordTags(
    distinctTags
  );

  const filteredRecords = useTagFilter(records, selectedTags, tags);

  return [filteredRecords, selectedTags, distinctTags, onSelectedTagChange];

};

export default useRecordTagFilter;
