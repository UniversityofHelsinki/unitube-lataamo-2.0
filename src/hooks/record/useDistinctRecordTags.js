import useRecordTags from "./useRecordTags";

const useDistinctRecordTags = (records = []) => {
  const allTags = useRecordTags(records);

  const groupedTags = {};
  allTags.flat().forEach(tag => {
    if (!groupedTags[tag.label]) {
      groupedTags[tag.label] = { ...tag, count: 0 };
    }
    groupedTags[tag.label].count++;
  });

  return Object.values(groupedTags).sort((a,b) => 
    a.label.localeCompare(b.label)
  );

};

export default useDistinctRecordTags;
