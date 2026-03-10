import { useState } from "react";
import useSteps from "../useSteps";
import { put } from "./useRecordDelete";

const deleteRecords = async (records = []) => {
  const failures = [];
  for (const record of records) {
    try {
      await put(record, record.identifier)
    } catch (error) {
      failures.push(record);
    }
  }
  
  if (failures.length > 0) {
    throw new Error('bulk_records_move_error', {
      cause: failures
    });
  }

};

const useRecordsDelete = (records = []) => {
  const [currentState, setCurrentState] = useState('not_started');
  const [failures, setFailures] = useState([]);

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

  const onError = (_i, error) => {
    const recordsNotDeleted = error.cause;
    setCurrentState('error');
    setFailures(recordsNotDeleted);
  };

  const reset = () => {
    setCurrentState('not_started');
  };

  return [
    currentState, 
    () => startDeleting(updateState, onError), 
    reset,
    failures
  ];
};

export default useRecordsDelete;
