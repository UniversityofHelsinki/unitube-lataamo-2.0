import { useEffect } from "react";
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
  }
};

const useAllRecords = (load = false) => {
  const dispatch = useDispatch();
  const allRecords = useSelector((state) => state.records.allRecords);

  useEffect(() => {
    if (load && !allRecords) {
      (async () => {
        dispatch({ type: 'SET_ALL_RECORDS', payload: await get() })
      })();
    }
  }, [load, allRecords, dispatch]);

  const loading = load && !allRecords;

  const reload = () => dispatch({ type: 'SET_ALL_RECORDS' });
  return [allRecords, loading, reload];
};

export default useAllRecords;
