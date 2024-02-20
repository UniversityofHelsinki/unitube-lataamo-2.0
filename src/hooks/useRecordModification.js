import useModification from "./useModification";

const useRecordModification = (record, validate, resetProgress) => {
  const [modifiedRecord, onChange, modified, undo] = useModification(record, validate, resetProgress);

  return [modifiedRecord, onChange, modified, undo];
};

export default useRecordModification;
