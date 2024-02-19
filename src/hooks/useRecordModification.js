import useModification from "./useModification";

const useRecordModification = (record, validate) => {
  const [modifiedRecord, onChange, modified, undo] = useModification(record, validate);

  return [modifiedRecord, onChange, modified, undo];
};

export default useRecordModification;
