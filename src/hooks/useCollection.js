import { useEffect, useState } from "react";
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

const useCollection = () => {
  const [searchParams] = useSearchParams();
  const [collection, setCollection] = useState(null);

  const thereIsCollection = collection?.identifier;
  const collectionHasChanged = thereIsCollection && 
    collection.identifier !== searchParams.collection;

  useEffect(() => {
    if (!thereIsCollection || collectionHasChanged) {
      (async () => {
        setCollection(await getCollection(searchParams.collection));
      })();
    }
  }, [collection, searchParams.collection]);

  const loading = !thereIsCollection || collectionHasChanged;
  const reload = () => setCollection(null);

  return [collection, loading, reload];

};

export default useCollection;
