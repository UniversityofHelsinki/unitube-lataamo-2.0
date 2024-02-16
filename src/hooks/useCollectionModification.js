import { useState } from "react";

const useCollectionModification = (collection) => {
  const [modifiedCollection, setModifiedCollection] = useState(null);
  const [touchedFields, setTouchedFields] = useState([]);
  const [modified, setModified] = useState(false);

  if (modifiedCollection?.identifier !== collection?.identifier) {
    setModifiedCollection({ ...collection });
    setTouchedFields([]);
    setModified(false);
  }

  const onChange = (what, value) => {
    const newModifiedCollection = {
      ...modifiedCollection,
      [what]: value
    };

    const newTouchedFields = [
      ...touchedFields,
      what
    ];

    const equalsOriginal = (() => {
      for (const field of newTouchedFields) {
        const newValues = [ newModifiedCollection[field] ].flat();
        const originalValues = [ collection[field] ].flat();

        if (newValues.length !== originalValues.length) {
          return false;
        }

        for (let i = 0; i < originalValues.length; i++) {
          if (newValues[i] !== originalValues[i]) {
            return false;
          }
        }
      }
      return true;
    })();

    setModifiedCollection(newModifiedCollection);
    setTouchedFields(newTouchedFields);
    setModified(!equalsOriginal);
  };

  const undo = () => {
    setModifiedCollection({ ...collection });
    setModified(false);
  };

  return [modifiedCollection, onChange, modified, undo];

};

export default useCollectionModification;
