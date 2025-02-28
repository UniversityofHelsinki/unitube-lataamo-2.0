import { useState } from "react";
import useSteps from "../useSteps";
import { put as moveRecord } from "./useRecordUpdate";

const moveRecords = async (records = [], destination) => {

  const alreadyInDestination = (record) => 
    record?.is_part_of !== destination

  return Promise.all(records.filter(alreadyInDestination).map(record => {
    return moveRecord({ ...record, isPartOf: destination });
  }));
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
