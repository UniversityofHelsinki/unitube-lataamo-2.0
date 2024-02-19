import useModification from "./useModification";

const useCollectionModification = (collection, validate) => {
  const [modifiedCollection, onChange, modified, undo] = useModification(collection, validate);

  return [modifiedCollection, onChange, modified, undo];
};

export default useCollectionModification;
