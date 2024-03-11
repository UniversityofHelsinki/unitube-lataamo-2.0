import useValidation from "../useValidation";
import validateAutomaticSubtitles from "./automaticSubtitlesValidation";
import subtitleFileValidation from "./subtitleFileValidation";

const validationFunctions = {
  subtitleFile: subtitleFileValidation,
  automaticSubtitles: validateAutomaticSubtitles
};

const useSubtitleValidation = () => {
  const [isValid, messages, validate] = useValidation(
    validationFunctions, 
    ['automaticSubtitles', 'subtitleFile']
  );

  return [isValid, messages, validate];
};

export default useSubtitleValidation;
