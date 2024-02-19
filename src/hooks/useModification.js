import { useState } from "react";

const useModification = (object, validate) => {
  const [modifiedObject, setModifiedObject] = useState(null);
  const [touchedFields, setTouchedFields] = useState([]);
  const [modified, setModified] = useState(false);

  if (modifiedObject?.identifier !== object?.identifier) {
    setModifiedObject({ ...object });
    setTouchedFields([]);
    setModified(false);
  }

  const onChange = async (what, value) => {
    const newModifiedObject = {
      ...modifiedObject,
      [what]: value
    };

    const newTouchedFields = [
      ...touchedFields,
      what
    ];

    const equalsOriginal = (() => {
      for (const field of newTouchedFields) {
        const newValues = [ newModifiedObject[field] ].flat();
        const originalValues = [ object[field] ].flat();

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

    if (validate) {
      await validate(newModifiedObject);
    }

    setModifiedObject(newModifiedObject);
    setTouchedFields(newTouchedFields);
    setModified(!equalsOriginal);
  };

  const undo = async () => {
    setModifiedObject({ ...object });
    setModified(false);
    await validate({ ...object });
  };

  return [modifiedObject, onChange, modified, undo];
};

export default useModification;
