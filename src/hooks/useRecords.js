import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const getRecords = () => async (dispatch) => {
  const URL = `${"http://localhost:3001"}/api/userInboxEvents`;
  try {
    const response = await fetch(URL);
    if (response.status === 200) {
      dispatch({ type: 'SET_RECORDS', payload: await response.json() });
    }
  } catch (error) {
    dispatch({ type: '', payload: error.message });
  }
};

const useRecords = ({ load = false }) => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records.records);

  useEffect(() => {
    if (load && !records) { 
      dispatch(getRecords());
    }
  }, [load, records]);

  const loading = !records;
  return [records, loading];
};

export default useRecords;
