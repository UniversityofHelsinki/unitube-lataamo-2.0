import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

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

const exclude = ['tag_deleted'];

const useSelectedRecordTags = (distinctTags) => {
  const { t } = useTranslation();
  const [selectedTags, setSelectedTags] = useState(null);
  const [knownDistinctTags, setKnownDistinctTags] = useState([]);

  useEffect(() => {
    if (distinctTagsChanged(knownDistinctTags, distinctTags)) {
      setSelectedTags([].filter(tag => 
        !exclude.map(e => t(e)).includes(tag.label)
      ));
      setKnownDistinctTags(distinctTags);
    }
  }, [distinctTags, knownDistinctTags]);

  const onChange = (tag) => {
    const tagAlreadySelected = selectedTags.map(st => st.label).includes(tag.label);
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

  return [selectedTags || [], onChange];

};

export default useSelectedRecordTags;
