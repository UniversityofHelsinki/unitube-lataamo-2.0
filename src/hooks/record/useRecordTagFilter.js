import useRecordTags from "./useRecordTags";

const useRecordTagFilter = (records = [], selectedTags = []) => {
  const tags = useRecordTags(records);

  const selectedTagLabels = selectedTags.map(st => st.label);

  if (selectedTags.length === 0) {
    return records;
  }

  return records.filter((_record, i) => {
    const recordTags = tags[i];
    const recordHasAllOfSelectedTags = recordTags.filter(recordTag => 
      selectedTagLabels.includes(recordTag.label)
    ).length === selectedTags.length;
    return recordHasAllOfSelectedTags;
  });

};

export default useRecordTagFilter;
