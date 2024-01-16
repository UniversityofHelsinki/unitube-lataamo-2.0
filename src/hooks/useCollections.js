import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getCollections = () => async (dispatch) => {
  const collections = [{ id: 'kokoelma' }, { id: 'kokoelma_2' }];
  dispatch({ type: 'SET_COLLECTIONS', payload: collections });
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
