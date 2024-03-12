import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const getCollections = async () => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/userSeries`;
  try {
    const response = await fetch(URL);
    if (response.status === 200) {
      return await response.json();
    }
    throw new Error(`Unexpected status code ${response.status} from ${URL}`);
  } catch (error) {
    console.error(error);
  }
};

const useCollections = (load = false) => {
  const dispatch = useDispatch();
  const collections = useSelector(
    (state) => state.collections.collections
  );

  useEffect(() => {
    if (load && !collections) {
      (async () => {
        dispatch({ 
          type: 'SET_COLLECTIONS',
          payload: await getCollections()
        });
      })();
    }
  }, [load, collections]);

  const reload = () => {
    dispatch({ type: 'SET_COLLECTIONS' });
  };

  const loading = !collections;

  return [collections, loading, reload];

};

export default useCollections;
