import useSelectedTags from "../useSelectedTags";

const useSelectedCollectionTags = (distinctTags, loadingCollections) => {
  const [selectedRecordTags, onChange, clearSelectedTags] = useSelectedTags(distinctTags, loadingCollections);
  return [selectedRecordTags, onChange, clearSelectedTags];
};

export default useSelectedCollectionTags;
