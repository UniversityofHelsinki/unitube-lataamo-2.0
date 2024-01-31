import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchParams from "./useSearchParams";

const getRecordEndDate = (record) => async (dispatch) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${record}/deletionDate`;
  try {
    const response = await fetch(URL);
    if (response.status === 200) {
      return await response.json();
    }
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
};

const getRecord = (record) => async (dispatch) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/event/${record}`
  try {
    const response = await fetch(URL);
    const deletionDate = await getRecordEndDate(record)(dispatch);
    if (response.status === 200) {
      dispatch({ type: 'SET_RECORD', payload: {
        ...await response.json(),
        deletionDate: deletionDate.deletionDate
      }});
    }
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
};

const useRecord = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentRecord = useSelector((state) => state.records.record);

  useEffect(() => {
    if (!currentRecord || currentRecord.identifier !== searchParams.record) {
      if (searchParams.record) {
        dispatch(getRecord(searchParams.record));
      }
    }
  }, [searchParams.record, dispatch]);

  const loading = !currentRecord || currentRecord.identifier !== searchParams.record;

  return [currentRecord, loading];
};

export default useRecord;
