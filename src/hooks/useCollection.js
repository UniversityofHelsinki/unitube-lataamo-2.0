import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchParams from "./useSearchParams";

const getCollection = async (identifier) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/series/${identifier}`;
  try {
    const response = await fetch(URL);
    return await response.json();
  } catch (error) {
    console.error(error);
  }
};

const useCollection = (load = false) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const collection = useSelector((state) => state.collections.collection);

  const thereIsCollection = collection?.identifier;
  const collectionHasChanged = thereIsCollection && 
    collection.identifier !== searchParams.collection;

  useEffect(() => {
    if (load && (!thereIsCollection || collectionHasChanged)) {
      (async () => {
        dispatch({ 
          type: 'SET_COLLECTION', 
          payload: await getCollection(searchParams.collection) 
        });
      })();
    }
  }, [searchParams.collection, collection?.identifier, dispatch]);

  const loading = !thereIsCollection || collectionHasChanged;
  const reload = () => dispatch({ type: 'SET_COLLECTION' });

  return [collection, loading, reload];

};

export default useCollection;
