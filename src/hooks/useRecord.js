import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchParams from "./useSearchParams";

const getRecordEndDate = async (record) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${record}/deletionDate`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
  } catch (error) {
    console.error(error);
  }
};

const getRecord = async (record) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${record}`
  try {
    const response = await fetch(URL);
    const deletionDate = await getRecordEndDate(record);
    if (response.ok) {
      return {
        ...await response.json(),
        deletionDate: deletionDate.deletionDate
      };
    }
  } catch (error) {
    console.error(error);
  }
};

const useRecord = (load = false) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.records.record);

  const thereIsRecord = Boolean(record?.identifier);
  const recordHasChanged = thereIsRecord && searchParams.record !== record.identifier;

  useEffect(() => {
    if (load && (!thereIsRecord || recordHasChanged)) {
      (async () => {
        dispatch({ 
          type: 'SET_RECORD', 
          payload: await getRecord(searchParams.record) 
        });
      })();
    }
  }, [searchParams.record, record?.identifier, dispatch]);

  const reload = () => {
    dispatch({ type: 'SET_RECORD' });
  };

  return [record, !thereIsRecord || recordHasChanged, reload];
};

export default useRecord;
