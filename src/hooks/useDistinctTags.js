import { useTranslation } from "react-i18next";

const useDistinctTags = (tags = []) => {
  const { t } = useTranslation();

  const groupedTags = {};

  tags.forEach(tag => {
    if (!groupedTags[tag.label]) {
      groupedTags[tag.label] = { ...tag, count: 0 };
    }
    groupedTags[tag.label].count++;
  });

  return Object.values(groupedTags).sort((a,b) => 
    t(a.label).localeCompare(t(b.label))
  );

};

export default useDistinctTags;
