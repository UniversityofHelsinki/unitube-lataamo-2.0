import { useState } from "react";
import useModification from "./useModification";

const useSubtitleModification = (validate) => {
  const [subtitles, onChange, modified, undo] = useModification({ identifier: '' }, validate);

  const handleChange = (input) => {
    onChange(input.type, input);
    Object.keys(subtitles).forEach((key) => {
      if (key !== input.type) {
        onChange(key, undefined);
      }
    });
  };

  const onlySelected = Object.entries(subtitles).filter(([_key, value]) => value);
  return [onlySelected, handleChange, modified, undo];
};

export default useSubtitleModification;
