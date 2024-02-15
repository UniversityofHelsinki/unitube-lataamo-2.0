import { useState } from "react";

const useCollectionModification = (collection) => {
  const [modifiedCollection, setModifiedCollection] = useState({ ...collection });
  const [modified, setModified] = useState(false);

  if (modifiedCollection.identifier !== collection?.identifier) {
    setModifiedCollection({ ...collection });
  }

  const onChange = (what, value) => {
    setModifiedCollection({
      ...modifiedCollection,
      [what]: value
    });
    setModified(true);
  };

  const undo = () => {
    setModifiedCollection({ ...collection });
  };

  return [modifiedCollection, onChange, modified];

};

export default useCollectionModification;
