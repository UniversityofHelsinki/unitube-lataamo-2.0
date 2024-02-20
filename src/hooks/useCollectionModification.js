import useModification from "./useModification";

const useCollectionModification = (collection, validate, resetProgress) => {
  const [modifiedCollection, onChange, modified, undo] = useModification(collection, validate, resetProgress);

  return [modifiedCollection, onChange, modified, undo];
};

export default useCollectionModification;
