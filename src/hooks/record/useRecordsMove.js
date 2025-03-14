import { useState } from "react";
import useSteps from "../useSteps";
import { put as moveRecord } from "./useRecordUpdate";

const moveRecords = async (records = [], destination) => {

  const alreadyInDestination = (record) => 
    record?.is_part_of !== destination

  const notInDestination = records
    .filter(alreadyInDestination);

  const failures = [];
  for (const record of notInDestination) {
    try {
      await moveRecord({ ...record, isPartOf: destination });
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
