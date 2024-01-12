import { useDispatch, useSelector } from "react-redux";
import useSearchParams from "./useSearchParams";

const getRecord = (record) => async (dispatch, getState) => {
  dispatch({ type: 'SET_RECORD', payload: { id: record } });
};

const useRecord = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const currentRecord = useSelector((state) => state.records.record);

  if (!currentRecord || currentRecord.id !== searchParams.record) {
    if (searchParams.record) {
      dispatch(getRecord(searchParams.record));
    }
  }

  return currentRecord;
};

export default useRecord;
