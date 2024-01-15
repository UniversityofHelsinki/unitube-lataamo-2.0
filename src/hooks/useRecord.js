import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchParams from "./useSearchParams";

const getRecord = (record) => async (dispatch) => {
  dispatch({ type: 'SET_RECORD', payload: { id: record } });
};

const useRecord = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentRecord = useSelector((state) => state.records.record);

  useEffect(() => {
    if (!currentRecord || currentRecord.id !== searchParams.record) {
      if (searchParams.record) {
        dispatch(getRecord(searchParams.record));
      }
    }
  }, [searchParams.record]);

  const loading = !currentRecord || currentRecord.id !== searchParams.record;

  return [currentRecord, loading];
};

export default useRecord;
