import { useState } from "react";
import { useTranslation } from "react-i18next";

const useValidation = (validationFunctions, fields) => {
  const [messages, setMessages] = useState({});
  const { t } = useTranslation();

  const validate = async (object, previousObject = {}) => {
    const newMessages = { ...messages };
    await Promise.all(fields.map(async field => {
      const valueHasChanged = object[field] !== previousObject[field];
      console.log('vaihtui value', field, valueHasChanged);
      if (validationFunctions[field] && valueHasChanged) {
        const message = await Promise.resolve(
          validationFunctions[field](object[field], object)
        );
        if (message) {
          newMessages[field] = { content: t(message), type: 'warning' };
        } else {
          delete newMessages[field];
        }
      }
    }));
    setMessages(newMessages);
  };

  const isValid = Object.keys(messages).length === 0;
  return [isValid, messages, validate];
};

export default useValidation;
