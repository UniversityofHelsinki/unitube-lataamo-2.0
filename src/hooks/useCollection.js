import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchParams from "./useSearchParams";

const getCollection = (identifier) => async (dispatch) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/series/${identifier}`;
  try {
    const response = await fetch(URL);
    dispatch({ type: 'SET_COLLECTION', payload: await response.json() });
  } catch (error) {
    dispatch({ type: 'SET_ERROR', payload: error.message });
  }
};

const useCollection = () => {
  const dispatch = useDispatch();
  const currentCollection = useSelector((state) => state.collections.collection);
  const [searchParams] = useSearchParams();

  useEffect(() => {
    if (!currentCollection || currentCollection.identifier !== searchParams.collection) {
      if (searchParams.collection) {
        dispatch(getCollection(searchParams.collection));
      }
    }
  }, [searchParams.collection]);

  const loading = !currentCollection || currentCollection.identifier !== searchParams.collection;

  return [currentCollection, loading];

};

export default useCollection;
