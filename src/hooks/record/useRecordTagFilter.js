import useRecordTags from "./useRecordTags";

const useRecordTagFilter = (records = [], selectedTags = []) => {
  const tags = useRecordTags(records);

  const selectedTagLabels = selectedTags.map(st => st.label);

  return records.filter((_record, i) => {
    const recordTags = tags[i];
    const recordHasOneOfSelectedTags = recordTags.find(recordTag => 
      selectedTagLabels.includes(recordTag.label)
    );
    return recordHasOneOfSelectedTags;
  });

};

export default useRecordTagFilter;
