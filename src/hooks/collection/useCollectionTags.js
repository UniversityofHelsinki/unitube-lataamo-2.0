import React from 'react';
import { useTranslation } from "react-i18next";

const visibility = (t, status, label, color) => (collection) => {
  const hasVisibility = collection.visibility.includes(status);
  if (hasVisibility) {
    return {
      label: t(label),
      color: color || 'blue'
    };
  }
  return null;
};

const useCollectionTags = (collections = []) => {
  const { t } = useTranslation();
  const tagFunctions = [
    visibility(t, 'status_private', 'tag_private'),
    visibility(t, 'status_published', 'tag_published'),
    visibility(t, 'status_unlisted', 'tag_unlisted'),
    visibility(t, 'status_moodle', 'tag_moodle', 'grey'),
  ];

  const tags = collections.map(collection => {
    return tagFunctions
      .flatMap(tagFunction => tagFunction(collection))
      .filter(tag => tag);
  });
  return tags;
};

export default useCollectionTags;
