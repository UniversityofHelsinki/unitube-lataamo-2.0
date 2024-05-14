import useSelectedTags from "../useSelectedTags";

const useSelectedRecordTags = (distinctTags) => {
  const [selectedRecordTags, onChange] = useSelectedTags(distinctTags);
  return [selectedRecordTags, onChange];

};

export default useSelectedRecordTags;
