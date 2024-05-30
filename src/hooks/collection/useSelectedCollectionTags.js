import useSelectedTags from "../useSelectedTags";

const useSelectedCollectionTags = (distinctTags) => {
  const [selectedRecordTags, onChange, clearSelectedTags] = useSelectedTags(distinctTags);
  return [selectedRecordTags, onChange, clearSelectedTags];
};

export default useSelectedCollectionTags;
