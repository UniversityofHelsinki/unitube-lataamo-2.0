import { useState } from "react";
import { ProgressStatus } from "../../Constants";
import useCollections from "../useCollections";
import useSearchParams from "../useSearchParams";
import { asAccessControlLists } from "./collectionRequest";

const post = async (collection) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/series`
  try {
    const response = await fetch(URL, {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(collection)
    });
    if (response.ok) {
      return await response.json();
    }
    throw new Error(`unexpected status code ${response.status}`);
  } catch (error) {
    console.error(error.message);
    throw new Error('error_while_uploading_collection', {
      cause: error
    });
  }
};

const convertToBody = (collection) => ({
  acl: asAccessControlLists(collection.published, collection.moodleNumbers),
  contributors: [ ...collection.persons, ...collection.iamgroups ],
  description: collection.description,
  published: collection.published,
  title: collection.title
});

const useCollectionSave = () => {
  const [progress, setProgress] = useState({
    status: ProgressStatus.NEW_COLLECTION.NOT_STARTED,
    percentage: 0
  });

  const [_searchParams, setSearchParams] = useSearchParams();
  const [_collections, _loading, reloadCollections] = useCollections();

  const resetProgress = () => setProgress({
    status: ProgressStatus.NEW_COLLECTION.NOT_STARTED,
    percentage: 0
  });

  const save = async (collection) => {
    let currentProgress = {
      status: ProgressStatus.NEW_COLLECTION.SENDING,
      percentage: 50,
    };
    setProgress(currentProgress);
    try {
      const id = await post(convertToBody(collection));
      currentProgress = {
        status: ProgressStatus.NEW_COLLECTION.DONE,
        percentage: 100,
      };
      setProgress(currentProgress);
      setSearchParams({ collection: id });
      reloadCollections();
    } catch (error) {
      setProgress({
        ...currentProgress,
        status: ProgressStatus.NEW_COLLECTION.ERROR,
        message: error.message
      });
    }
  };

  return [progress, save, resetProgress];

};

export default useCollectionSave;
