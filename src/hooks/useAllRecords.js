import {useEffect, useState} from "react";
import { useDispatch, useSelector } from "react-redux";

const get = async () => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/userVideos`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Unexpected status code ${response.status} while fetching all user recordings from ${URL}`);
  } catch (error) {
    console.error(error.message);
    throw error;
  }
};

const useAllRecords = (load = false) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const allRecords = useSelector((state) => state.records.allRecords);

  useEffect(() => {
    if (load && !allRecords) {
      (async () => {
        try {
          dispatch({type: 'SET_ALL_RECORDS', payload: await get()});
          setError(null);
        } catch (error) {
          console.error(error.message);
          setError({ source: error });
        }
      })();
    }
  }, [load, allRecords, dispatch, error]);

  const loading = (load && !allRecords) && error === null;

  const reload = () => dispatch({ type: 'SET_ALL_RECORDS' });
  return [allRecords, loading, reload, error];
};

export default useAllRecords;
