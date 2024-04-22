import useRecordTags from "./useRecordTags";

const useDistinctRecordTags = (records = []) => {
  const tags = useRecordTags(records);

  const labels = new Set();
  const distinctTags = tags.flat().filter(tag => {
    if (!labels.has(tag.label)) {
      labels.add(tag.label);
      return true;
    }
    return false;
  });

  return distinctTags.sort((a,b) => 
    a.label.localeCompare(b.label)
  );

};

export default useDistinctRecordTags;
