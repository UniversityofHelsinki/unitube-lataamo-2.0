const useTagFilter = (objects = [], selectedTags = [], allTags = []) => {
  const selectedTagLabels = selectedTags.map(st => st.label);

  if (selectedTags.length === 0) {
    return objects;
  }

  return objects.filter((_record, i) => {
    const objectTags = allTags[i];
    const objectHasAllOfSelectedTags = objectTags.filter(recordTag => 
      selectedTagLabels.includes(recordTag.label)
    ).length === selectedTags.length;
    return objectHasAllOfSelectedTags;
  });

};

export default useTagFilter;
