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

const useSelectedRecordTags = (distinctTags) => {
  const [selectedTags, setSelectedTags] = useState(null);
  const [knownDistinctTags, setKnownDistinctTags] = useState([]);

  useEffect(() => {
    if (distinctTagsChanged(knownDistinctTags, distinctTags)) {
      setSelectedTags([ ...distinctTags ]);
      setKnownDistinctTags(distinctTags);
    }
  }, [distinctTags, knownDistinctTags]);

  const onChange = (tag) => {
    if (!selectedTags.map(st => st.label).includes(tag.label)) {
      setSelectedTags(
        [ ...selectedTags, tag ]
      );
    } else {
      setSelectedTags(
        selectedTags.filter(st => st.label !== tag.label)
      );
    }
  };

  return [selectedTags || [], onChange];

};

export default useSelectedRecordTags;
