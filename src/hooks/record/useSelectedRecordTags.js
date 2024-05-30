import useSelectedTags from "../useSelectedTags";

const useSelectedRecordTags = (distinctTags) => {
  const [selectedRecordTags, onChange, clearSelectedTags] = useSelectedTags(distinctTags);
  return [selectedRecordTags, onChange, clearSelectedTags];

};

export default useSelectedRecordTags;
