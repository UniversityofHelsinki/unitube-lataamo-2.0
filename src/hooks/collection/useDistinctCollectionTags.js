import useDistinctTags from "../useDistinctTags";
import useCollectionTags from "./useCollectionTags";

const useDistinctCollectionTags = (collections = []) => {
  const allTags = useCollectionTags(collections);
  const distinctTags = useDistinctTags(allTags.flat());

  return distinctTags;
};

export default useDistinctCollectionTags;
