import { useState } from "react";
import useSteps from "../useSteps";
import { put as moveRecord } from "./useRecordUpdate";

const moveRecords = async (records = [], destination) => {

  const alreadyInDestination = (record) => 
    record?.is_part_of !== destination

  const batches = records
    .filter(alreadyInDestination)
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

  const moved = [];
  for (const batch of batches) {
    moved.push(await Promise.all(batch.map(record =>
      moveRecord({ ...record, isPartOf: destination })
    )));
  }

  return moved;
};

const useRecordsMove = (records = [], destination) => {
  const [currentState, setCurrentState] = useState('not_started');

  const [states] = useState([
    'in_progress',
    'done'
  ]);

  const [startMoving] = useSteps([
    async () => moveRecords(records, destination)
  ]);

  const updateState = (index) => {
    setCurrentState(states[index]);
  }

  const onError = () => {
    setCurrentState('error');
  };

  const reset = () => {
    setCurrentState('not_started');
  };

  return [
    currentState, 
    () => startMoving(updateState, onError),
    reset
  ];


};

export default useRecordsMove;
