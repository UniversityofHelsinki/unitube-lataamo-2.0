import {useState} from "react";
import useSteps from "../useSteps";

const put = async (id, deletionDate) => {
  try {
    let response = await fetch(`${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${id}/deletionDate`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ deletionDate })
    });
    if(response.status === 200) {
      let responseJSON = await response.json();
      return responseJSON;
    } else {
      throw new Error(response.status);
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateDeletionDates = (records = []) => {
  return Promise.all(
    records.map((record) => 
      put(record.identifier, record.deletionDate)
  ));
}

const useRecordsDeletionDatesUpdate = (inputs = []) => {
  const [currentState, setCurrentState] = useState('not_started');

  const [states] = useState([
    'in_progress',
    'done'
  ]);

  const [startUpdating] = useSteps([
    async () => await updateDeletionDates(inputs)
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
    () => startUpdating(updateState, onError), 
    reset
  ];

};

export default useRecordsDeletionDatesUpdate;
