import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getCollections = () => async (dispatch) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/userSeries`;
  try {
    const response = await fetch(URL);
    if (response.status === 200) {
      dispatch({ type: 'SET_COLLECTIONS', payload: await response.json() });
    }
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
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

  const reload = () => {
    dispatch({ type: 'SET_COLLECTIONS' });
  };

  const loading = !collections;

  return [collections, loading, reload];

};

export default useCollections;
