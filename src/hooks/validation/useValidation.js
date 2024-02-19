import { useState } from "react";
import { useTranslation } from "react-i18next";

const useValidation = (validationFunctions, fields) => {
  const [messages, setMessages] = useState({});
  const { t } = useTranslation();

  const validate = async (object) => {
    const newMessages = { ...messages };
    await Promise.all(fields.map(async field => {
      if (validationFunctions[field]) {
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
