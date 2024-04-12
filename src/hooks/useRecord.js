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
    throw new Error(`Unexpected status code from ${URL}`, { 
      cause: { status: response.status }
    });
  } catch (error) {
    console.error(error);
    throw error;
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
    throw new Error(`Unexpected status code from ${URL}`, { 
      cause: { status: response.status }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const useRecord = (load = false) => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const record = useSelector((state) => state.records.record);
  const [error, setError] = useState(null);

  const shouldLoad = searchParams.record && 
    (!record || record.identifier !== searchParams.record) && 
    (!error || error.identifier !== searchParams.record);

  useEffect(() => {
    if (load && shouldLoad) {
      (async () => {
        try {
          dispatch({ 
            type: 'SET_RECORD', 
            payload: await getRecord(searchParams.record) 
          });
          setError(null);
        } catch (error) {
          setError({ source: error, identifier: searchParams.record });
        }
      })();
    }
  }, [searchParams.record, record?.identifier, error, dispatch]);

  const reload = () => {
    dispatch({ type: 'SET_RECORD' });
    setError(null);
  };

  const loading = shouldLoad;
  return [record, loading, reload, error];
};

export default useRecord;
