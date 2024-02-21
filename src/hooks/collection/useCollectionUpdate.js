import { useState } from "react";
import { ProgressStatus, ROLE_ANONYMOUS, ROLE_KATSOMO, ROLE_KATSOMO_TUOTANTO, ROLE_USER_UNLISTED, STATUS } from "../../Constants";
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

const asAccessControlLists = (publicity, moodleNumbers) => {
  const moodleNumberAcls = moodleNumbers.map(number => 
    [`${number}_Instructor`, `${number}_Learner`]
  ).flat();
  if (publicity === ROLE_ANONYMOUS) {
    return [ publicity, ROLE_KATSOMO_TUOTANTO, ...moodleNumberAcls ];
  } else if (publicity === ROLE_USER_UNLISTED) {
    return [ publicity, ...moodleNumberAcls ];
  }
  return moodleNumberAcls;
};

const asVisibility = (acl, moodleNumbers) => {
  for (const role of [ROLE_ANONYMOUS, ROLE_KATSOMO_TUOTANTO, ROLE_KATSOMO]) {
    if (acl.includes(role)) {
      return [ STATUS.PUBLISHED, ...moodleNumbers ];
    }
  }

  if (acl.includes[ROLE_USER_UNLISTED]) {
    return [ STATUS.UNLISTED, ...moodleNumbers ];
  }

  return [ STATUS.PRIVATE, ...moodleNumbers ];
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
