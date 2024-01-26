import { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from 'prop-types';
import validateTitle from './titleValidation.js';
import validateDescription from './descriptionValidation.js';
import validateLicense from "./licenseValidation";
import validateFile from "./fileValidation.js";
import validateDeletionDate from "./deletionDateValidation.js";

const validationFunctions = {
  file: validateFile,
  title: validateTitle,
  description: validateDescription,
  license: validateLicense,
  deletionDate: validateDeletionDate
};

const useRecordValidation = (fields) => {
  const [messages, setMessages] = useState({});
  const { t } = useTranslation();

  const validate = async (record) => {
    const newMessages = { ...messages };
    await Promise.all(fields.map(async field => {
      if (validationFunctions[field]) {
        const message = await Promise.resolve(
          validationFunctions[field](record[field], record)
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

useRecordValidation.propTypes = {
  fields: PropTypes.array
};

export default useRecordValidation;
