import { FIELD_IS_VALID } from "../../../Constants";

const validateFromAndTo = (input) => {
    // Check if 'from' has a value
    const fromValid = input?.value?.some(item => item.from && item.from.length > 0);
    // Check if 'to' array has at least one 'lang' checked
    const toValid = input?.value?.some(item =>
        Array.isArray(item.to) && item.to.some(subItem => subItem.isChecked === true));

    // Return combined validation result
    if (!fromValid || !toValid) {
        return 'record_translation_subtitle_language_missing';
    }
    return FIELD_IS_VALID;
}

const validateTranslationSubtitles = (input, _record) => {
    if (!input) {
        return FIELD_IS_VALID;
    }
    const noneSelected = validateFromAndTo(input);
    if (noneSelected) {
       return {
           translationLanguage: noneSelected,
       };
    }
    return FIELD_IS_VALID;
};

export default validateTranslationSubtitles;
