import useValidation from "../useValidation";
import descriptionValidation from "./descriptionValidation";
import publicityValidation from "./publicityValidation";
import titleValidation from "./titleValidation";

const validationFunctions = {
  title: titleValidation,
  description: descriptionValidation,
  published: publicityValidation,
};

const useCollectionValidation = (fields) => {
  const [isValid, messages, validate] = useValidation(
    [validationFunctions], 
    fields
  );

  return [
    isValid[0], 
    messages[0], 
    (collection, previousCollection, validateAllFields) => 
      validate([collection], [previousCollection], validateAllFields)
  ];
};

export default useCollectionValidation;
