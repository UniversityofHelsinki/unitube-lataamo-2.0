import useSelectedTags from "../useSelectedTags";

const useSelectedRecordTags = (distinctTags, loadingRecords) => {
  const [selectedRecordTags, onChange, clearSelectedTags] = useSelectedTags(distinctTags, loadingRecords);
  return [selectedRecordTags, onChange, clearSelectedTags];

};

export default useSelectedRecordTags;
