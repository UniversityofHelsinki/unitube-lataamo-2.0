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

const useDeletedRecords = () => {
  const dispatch = useDispatch();
  const { 
    deletedRecords, 
    loadingDeletedRecords 
  } = useSelector((state) => state.records); 

  const shouldLoad = !deletedRecords && !loadingDeletedRecords;

  useEffect(() => {
    if (shouldLoad) {
      dispatch({ type: 'SET_LOADING_DELETED_RECORDS', payload: true });
      (async () => {
        dispatch({ type: 'SET_DELETED_RECORDS', payload: await get() });
      })();
    }
  }, [shouldLoad, dispatch]);

  const loading = Boolean(!deletedRecords);
  const reload = () => dispatch({ type: 'SET_DELETED_RECORDS' });

  return [deletedRecords, loading, reload];

};

export default useDeletedRecords;
