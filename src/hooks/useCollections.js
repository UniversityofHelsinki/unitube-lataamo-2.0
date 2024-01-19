import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getCollections = () => async (dispatch) => {
  const URL = `${"http://localhost:3001"}/api/userSeries`;
  try {
    const response = await fetch(URL);
    if (response.status === 200) {
      dispatch({ type: 'SET_COLLECTIONS', payload: await response.json() });
    }
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
  /*
  const collections = [
    { id: 'kokoelma', records: [{ name: 'video.mp4' }, { name: 'toinen-video.mp4' }, { name: 'kolmas-videoooooooooooooo.mp4' }] }, 
    { id: 'kokoelma_2', records: [] }
  ];
  */
};

const useCollections = ({ load = false }) => {
  const dispatch = useDispatch();
  const collections = useSelector(
    (state) => state.collections.collections
  );

  useEffect(() => {
    if (load && !collections) {
      dispatch(getCollections());
    }
  }, [load, collections]);

  const loading = !collections;

  return [collections, loading];

};

export default useCollections;
