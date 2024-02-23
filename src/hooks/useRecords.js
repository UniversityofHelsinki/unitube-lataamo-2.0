import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const getRecords = () => async (dispatch) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/userInboxEvents`;
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

  const reload = () => {
    dispatch({ type: 'SET_RECORDS' });
  };

  const loading = !records;
  return [records, loading, reload];
};

useRecords.PropTypes = {
  load: PropTypes.bool
};

export default useRecords;
