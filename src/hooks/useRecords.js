import { useDispatch, useSelector } from 'react-redux';

const getRecords = () => async (dispatch) => {
  const mockRecords = [{
    name: "video.mp4",
    description: "asdfsdfadf",
    tags: ["käsittelyssä"],
  }, {
    name: "toinen-video.mp4",
    description: "asdfsafasfdf",
    tags: ["asdfasdfasdf"]
  }];
  dispatch({ type: 'SET_RECORDS', payload: mockRecords });
};

const useRecords = () => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records.records);
  if (!records) {
    dispatch(getRecords());
  }
  return [records, !records];
};

export default useRecords;
