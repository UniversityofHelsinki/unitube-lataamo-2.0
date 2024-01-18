import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchParams from "./useSearchParams";

const getCollection = (id) => async (dispatch) => {
  dispatch({ type: 'SET_COLLECTION', payload: { id } });
};

const useCollection = () => {
  const dispatch = useDispatch();
  const currentCollection = useSelector((state) => state.collections.collection);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!currentCollection || currentCollection.id !== searchParams.collection) {
      if (searchParams.collection) {
        dispatch(getCollection(searchParams.collection));
      }
    }
  }, [searchParams.collection]);

  const loading = !currentCollection || currentCollection.id !== searchParams.collection;

  return [currentCollection, loading];

};

export default useCollection;
