import { useState } from "react";
import useSteps from "../useSteps";
import { put } from "./useRecordDelete";

const deleteRecords = async (records = []) => {
  return await Promise.all(records.map((record) => {
    return put(record, record.identifier);
  }));
};

const useRecordsDelete = (records = []) => {
  const [currentState, setCurrentState] = useState('not_started');

  const [states] = useState([
    'in_progress',
    'done'
  ]);

  const [startDeleting] = useSteps([
    async () => await deleteRecords(records)
  ]);

  const updateState = (index) => {
    setCurrentState(states[index]);
  };

  const onError = () => {
    setCurrentState('error');
  };

  const reset = () => {
    setCurrentState('not_started');
  };

  return [
    currentState, 
    () => startDeleting(updateState, onError), 
    reset
  ];
};

export default useRecordsDelete;
