import useDistinctTags from "../useDistinctTags";

const useDistinctRecordTags = (tags = []) => {
  const distinctTags = useDistinctTags(tags.flat());

  return distinctTags;
};

export default useDistinctRecordTags;
