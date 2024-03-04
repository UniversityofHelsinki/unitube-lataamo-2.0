import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const getRecords = async () => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/userInboxEvents`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Unexpected status code from ${URL}`);
  } catch (error) {
    console.error(error);
    throw new Error(`Error occurred while getting records ${URL}`, {
      cause: error
    });
  }
};

const useRecords = ({ load = false }) => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records.records);
  const loadingRecords = useSelector((state) => state.records.loadingRecords);

  useEffect(() => {
    if (!records && !loadingRecords && load) {
      dispatch({ type: 'SET_LOADING_RECORDS', payload: true });
      (async () => {
        dispatch({ type: 'SET_RECORDS', payload: await getRecords() });
      })();
    }
  }, [records, loadingRecords]);

  const reload = () => {
    dispatch({ type: 'SET_RECORDS' });
  };

  const loading = loadingRecords;
  return [records, loading, reload];
};

useRecords.PropTypes = {
  load: PropTypes.bool
};

export default useRecords;
