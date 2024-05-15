import useDistinctTags from "../useDistinctTags";
import useRecordTags from "./useRecordTags";

const useDistinctRecordTags = (records = []) => {
  const allTags = useRecordTags(records);
  const distinctTags = useDistinctTags(allTags.flat());

  return distinctTags;
};

export default useDistinctRecordTags;
