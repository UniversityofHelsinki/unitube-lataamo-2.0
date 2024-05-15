import useSelectedTags from "../useSelectedTags";

const useSelectedCollectionTags = (distinctTags) => {
  const [selectedRecordTags, onChange] = useSelectedTags(distinctTags);
  return [selectedRecordTags, onChange];
};

export default useSelectedCollectionTags;
