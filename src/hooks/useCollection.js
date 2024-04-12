import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useSearchParams from "./useSearchParams";

const getCollection = async (identifier) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/series/${identifier}`;
  try {
    const response = await fetch(URL);
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`Unexpected status code from ${URL}`, {
      cause: { status: response.status }
    });
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const useCollection = (load = false) => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [error, setError] = useState(null);
  const collection = useSelector((state) => state.collections.collection);

  const shouldLoad = searchParams.collection && 
    (!collection || collection.identifier !== searchParams.collection) && 
    (!error || error.identifier !== searchParams.collection);

  useEffect(() => {
    if (load && shouldLoad) {
      (async () => {
        try {
          dispatch({ 
            type: 'SET_COLLECTION', 
            payload: await getCollection(searchParams.collection) 
          });
          setError(null);
        } catch (error) {
          console.error(error.message);
          setError({ source: error, identifier: searchParams.collection });
        }
      })();
    }
  }, [searchParams.collection, collection?.identifier, error, dispatch]);

  const loading = shouldLoad;
  const reload = () => dispatch({ type: 'SET_COLLECTION' });

  return [collection, loading, reload, error];

};

export default useCollection;
