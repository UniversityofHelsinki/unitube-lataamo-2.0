import { useState } from "react";
import { ProgressStatus } from "../../Constants";
import { asAccessControlLists, asVisibility } from "./collectionRequest";
import useRepublishMetadata from "./useRepublishMetadata";

const put = async (collection) => {
  const URL = `${process.env.REACT_APP_LATAAMO_PROXY_SERVER}/api/series/${collection.identifier}`;
  try {
    const response = await fetch(URL, {
      method: 'PUT',
      body: JSON.stringify(collection),
      headers: {
        'content-type': 'application/json; charset=utf-8',
      }
    });

    if (response.ok) {
      return await response.json();
    }

  } catch (error) {
    console.error(error);
    throw new Error('Error while trying to update collection.', {
      cause: error
    });
  }
};

const convertToBody = (collection) => {
  const acl = asAccessControlLists(collection.published, collection.moodleNumbers);
  return {
    ...collection,
    acl,
    contributors: [ ...collection.persons, ...collection.iamgroups ],
    visibility: asVisibility(acl, collection.moodleNumbers)
  };
};

const useCollectionUpdate = () => {
  const [progress, setProgress] = useState({
    status: ProgressStatus.COLLECTION_SAVE.NOT_STARTED,
    percentage: 0
  });
  const [republishMetadata] = useRepublishMetadata();

  const save = async (collection, modified) => {
    const body = convertToBody(collection);
    try {
      if (modified) {
        setProgress({
          status: ProgressStatus.COLLECTION_SAVE.IN_PROGRESS,
          percentage: 0 
        });
        await put(body);
      }
      setProgress({
        status: ProgressStatus.COLLECTION_SAVE.REPUBLISHING_METADATA,
        percentage: 100 
      });
      await republishMetadata(body);
      setProgress({
        status: ProgressStatus.COLLECTION_SAVE.DONE, 
        percentage: 100 
      });
    } catch (error) {
      setProgress({
        status: ProgressStatus.COLLECTION_SAVE.ERROR,
        percentage: 100,
        message: error.message
      });
    }
  };

  const reset = () => setProgress({
    status: ProgressStatus.COLLECTION_SAVE.NOT_STARTED, 
    percentage: 0 
  });

  return [progress, save, reset];
};

export default useCollectionUpdate;

