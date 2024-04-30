import { useTranslation } from "react-i18next";
import useSearch, { partialMatch, wholeMatch } from "../useSearch";

const properties = {
  identifier: wholeMatch,
  title: partialMatch,
  description: partialMatch,
  duration: partialMatch,
  created: partialMatch,
  deletionDate: partialMatch
};

const dateFormat = (language) => (value) => {
  if (!value) {
    return '';
  }

  try {
    return new Intl.DateTimeFormat(language, {day: '2-digit', month: '2-digit', year: 'numeric'}).format(new Date(value));
  } catch (error) {
    return '';
  }
};

const useRecordSearch = (records = [], searchQuery = '') => {
  const { i18n } = useTranslation();
  const transforms = {
    created: dateFormat(i18n.language),
    deletionDate: dateFormat(i18n.language)
  };

  const filteredRecords = useSearch(records, searchQuery, properties, transforms);

  return filteredRecords;
};

export default useRecordSearch;
