import { useEffect, useState } from "react";

const distinctTagsChanged = (previous = [], next = []) => {
  const previousLabels = previous.map(tag => tag.label);
  const nextLabels = next.map(tag => tag.label);
  if (previousLabels.length !== nextLabels.length) {
    return true;
  }
  for (let i = 0; i < previousLabels.length; i++) {
    if (previousLabels[i] !== nextLabels[i]) {
      return true;
    }
  }
  return false;
};

const useSelectedTags = (distinctTags = []) => {
  const [selectedTags, setSelectedTags] = useState(null);
  const [knownDistinctTags, setKnownDistinctTags] = useState([]);

  useEffect(() => {
    if (distinctTagsChanged(knownDistinctTags, distinctTags)) {
      setSelectedTags([]);
      setKnownDistinctTags(distinctTags);
    }
  }, [distinctTags, knownDistinctTags]);

  const onChange = (tag) => {
    const tagAlreadySelected = selectedTags
      .map(st => st.label)
      .includes(tag.label);

    if (!tagAlreadySelected) {
      setSelectedTags(
        [ ...selectedTags, tag ]
      );
    } else {
      setSelectedTags(
        selectedTags.filter(st => st.label !== tag.label)
      );
    }
  };

  const clearSelectedTags = () => {
    setSelectedTags([]);
  };

  return [selectedTags || [], onChange, clearSelectedTags];
};
  
export default useSelectedTags;
