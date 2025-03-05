import { useState } from "react";
import useSteps from "../useSteps";
import { put } from "./useRecordDelete";

const deleteRecords = async (records = []) => {
  const batches = records
    .reduce((batches, record) => {

      const currentBatch = batches[batches.length - 1];
      const isFull = currentBatch.length === 10;

      if (isFull) {
        batches.push([]);
      }

      const nextBatch = batches[batches.length - 1];
      nextBatch.push(record);

      return batches;
    }, [[]]);

  const deleted = [];
  for (const batch of batches) {
    deleted.push(await Promise.all(batch.map(record =>
      put(record, record.identifier)
    )));
  }

  return deleted;
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
