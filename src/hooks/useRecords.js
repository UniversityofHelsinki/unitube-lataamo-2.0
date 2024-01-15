import { useEffect } from 'react';
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

const useRecords = ({ load = false }) => {
  const dispatch = useDispatch();
  const records = useSelector((state) => state.records.records);

  useEffect(() => {
    if (load && !records) { 
      dispatch(getRecords());
    }
  }, [load, records]);

  const loading = !records;
  return [records, loading];
};

export default useRecords;
