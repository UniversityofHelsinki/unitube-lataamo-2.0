import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const get = async () => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/userTrashEvents`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`unexpected status code from ${URL}`);
  } catch (error) {
    console.error(error);
    throw new Error(`Error while GETting deleted records from ${URL}`);
  }
};

const useDeletedRecords = (load = false) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const deletedRecords = useSelector((state) => state.records.deletedRecords); 

  useEffect(() => {
    if (load && !deletedRecords) {
      (async () => {
        try {
          dispatch({ type: 'SET_DELETED_RECORDS', payload: await get() });
          setError(null);
        } catch (error) {
          console.error(error.message);
          setError({ source: error });
        }
      })();
    }
  }, [deletedRecords, load, dispatch, error]);

  const loading = (load && !deletedRecords) && error === null;

  const reload = () => dispatch({ type: 'SET_DELETED_RECORDS' });

  return [deletedRecords, loading, reload, error];

};

export default useDeletedRecords;
