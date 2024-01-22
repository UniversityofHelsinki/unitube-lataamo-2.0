import { useState } from "react";
import { useTranslation } from "react-i18next";

const useCollectionValidation = () => {
  const [messages, setMessages] = useState({});
  const [isValid, setIsValid] = useState({});
  const { t } = useTranslation();

  const validateName = (name) => {
    if (name.length === 0) {
      setMessages({ ...messages, name: t('record_validaton_name_is_empty')});
      setIsValid(false);
    }
  };

  const validate = (record) => {
    validateName(record.name);
  };

  return [isValid, messages, validate];
};

export default useCollectionValidation;
