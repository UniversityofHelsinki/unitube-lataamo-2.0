import { useTranslation } from "react-i18next";
import useUser from "../useUser";


const deleted = (user, t) => (record) => {
  const isInTrash = record.series === `trash ${user.eppn}`;
  if (isInTrash) {
    return {
      label: t('tag_deleted'),
      color: 'red'
    };
  }
  return null;
};

const useRecordTags = (record) => {
  const { t } = useTranslation();
  const [user] = useUser();

  const tagFunctions = [deleted(user, t)];

  const tags = tagFunctions
    .map(tagFunction => tagFunction(record))
    .filter(tag => tag);

  return tags;
};

export default useRecordTags;
