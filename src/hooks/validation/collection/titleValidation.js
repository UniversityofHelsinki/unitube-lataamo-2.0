import { FIELD_IS_VALID, FORBIDDEN_CHARACTERS } from "../../../Constants";

const validateTitle = (title) => {
  if (!title || title.length === 0) {
    return 'collection_validation_title_is_empty';
  }

  if (title.toLowerCase().includes('inbox')) {
    return 'collection_validation_title_contains_word_inbox';
  }

  if (title.toLowerCase().includes('trash')) {
    return 'collection_validation_title_contains_word_trash';
  }

  if (FORBIDDEN_CHARACTERS.test(title)) {
    return 'collection_validation_title_contains_forbidden_characters';
  }

  return FIELD_IS_VALID;
};

export default validateTitle;
