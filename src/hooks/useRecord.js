import { useDispatch, useSelector } from "react-redux";

const getRecord = (id) => async (dispatch) => {
  dispatch({ type: 'GET_RECORD', payload: id });
};

const useRecord = (id) => {
  const dispatch = useDispatch();
  const record = useSelector(state => state.example.record);
  if (!record) {
    dispatch(getRecord(id));
  }
  return record;
};

export default useRecord;
