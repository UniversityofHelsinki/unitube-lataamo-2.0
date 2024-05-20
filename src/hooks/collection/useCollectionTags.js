import React from 'react';

const visibility = (status, label, color) => (collection) => {
  const hasVisibility = collection?.visibility?.includes(status);
  if (hasVisibility) {
    return {
      label: label,
      ariaLabel: `collection_${label}_aria`,
      color: color || 'blue'
    };
  }
  return null;
};

const useCollectionTags = (collections = []) => {
  const tagFunctions = [
    visibility('status_private', 'tag_private'),
    visibility('status_published', 'tag_published'),
    visibility('status_unlisted', 'tag_unlisted'),
    visibility('status_moodle', 'tag_moodle', 'grey'),
  ];

  const tags = collections.map(collection => {
    return tagFunctions
      .flatMap(tagFunction => tagFunction(collection))
      .filter(tag => tag);
  });
  return tags;
};

export default useCollectionTags;
