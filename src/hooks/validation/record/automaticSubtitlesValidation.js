import { DEFAULT_LANGUAGES, DEFAULT_LANGUAGE_MODELS, FIELD_IS_VALID } from "../../../Constants";

const validateTranslationModel = (translationModel) => {
  if (!translationModel || translationModel.length === 0) {
    return 'record_automatic_subtitles_translation_model_empty';
  }
  
  const unknownModel = !DEFAULT_LANGUAGE_MODELS.includes(translationModel);
  if (unknownModel) {
    return 'record_automatic_subtitles_translation_model_unknown_model';
  }
  return FIELD_IS_VALID;

};

const validateTranslationLanguage = (translationLanguage) => {
  if (!translationLanguage || translationLanguage.length === 0) {
    return 'record_automatic_subtitles_translation_language_empty';
  }

  const unknownLanguage = !DEFAULT_LANGUAGES.includes(translationLanguage);
  if (unknownLanguage) {
    return 'record_automatic_subtitles_translation_language_unknown';
  }

  return FIELD_IS_VALID;
};

const validateAutomaticSubtitles = (input, _record) => {
  if (!input) {
    return FIELD_IS_VALID;
  }

  const translationModel = input.translationModel;
  const translationLanguage = input.translationLanguage;
  const translationModelIsValid = validateTranslationModel(translationModel);
  const translationLanguageIsValid = validateTranslationLanguage(translationLanguage);
  return translationModelIsValid || translationLanguageIsValid;

};

export default validateAutomaticSubtitles;
