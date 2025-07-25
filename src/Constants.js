export const DEFAULT_LICENSES = ['ALLRIGHTS', 'CC-BY', 'CC-BY-NC-ND', 'CC0'];
export const DEFAULT_LANGUAGE_MODELS = ['MS_WHISPER', 'MS_ASR'];
export const DEFAULT_LANGUAGES = ['fi-FI', 'sv-SE', 'en-US'];

export const MAX_FILE_SIZE_LIMIT = 2.5e+10;
export const MIN_FILE_SIZE_LIMIT = 1e+6;
export const MIN_VIDEO_DURATION = 1;

export const ACCEPTED_MIME_TYPES = "video/mp4, video/quicktime, video/x-msvideo, video/webm";

export const ACCEPTED_VTT_MIME_TYPES = "vtt, srt";

export const DATE_FORMAT = "dd.MM.yyyy";

export const DELETION_DATE_MIN_MONTHS = 6;
export const DELETION_DATE_MAX_YEARS = 3;

export const DEFAULT_LANGUAGE = 'fi';
export const LANGUAGES = ['fi', 'sv', 'en'];
export const TRANSLATION_SUBTITLES_SUPPORTED_LANGUAGES = ['fin', 'swe', 'eng'];

export const ProgressStatus = {
  NEW_RECORD: {
    NOT_STARTED: 'not_started',
    SENDING: 'sending',
    SENDING_SUBTITLES: 'sending_subtitles',
    PROCESSING_SUBTITLES: 'processing_subtitles',
    SENDING_SUBTITLE_ORDER: 'sending_subtitle_order',
    ERROR: 'error',
    DONE: 'done',
    ABORTED: 'aborted',
    PROCESSING: 'processing'
  },
  NEW_RECORD_SAVE: {
    NOT_STARTED: 'not_started',
    ERROR: 'error',
    DONE: 'done'
  },
  NEW_COLLECTION: {
    NOT_STARTED: 'not_started',
    SENDING: 'sending',
    ERROR: 'error',
    DONE: 'done'
  },
  RECORD_SAVE: {
    NOT_STARTED: 'not_started',
    IN_PROGRESS_RECORD: 'in_progress_record',
    IN_PROGRESS_SUBTITLES: 'in_progress_subtitles',
    IN_PROGRESS_ORDERSUBTITLES: 'in_progress_ordersubtitles',
    IN_PROGRESS_DELETESUBTITLE :'in_progress_deletesubtitle',
    IN_PROGRESS_UPDATESUBTITLES :'in_progress_updatesubtitles',
    IN_PROGRESS_SUBTITLECONVERSION :'in_progress_subtitleconversion',
    DONE: 'done',
    ERROR: 'error'
  },
  COLLECTION_SAVE: {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    REPUBLISHING_METADATA: 'republishing_metadata',
    DONE: 'done',
    ERROR: 'error'
  },
  COLLECTION_RECORDS_DELETION_DATE_SAVE: {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
    ERROR: 'error'
  },
  COLLECTION_DELETE: {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
    ERROR: 'error'
  },
  RECORD_DELETE: {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
    ERROR: 'error'
  },
  RECORD_RESTORE: {
    NOT_STARTED: 'not_started',
    IN_PROGRESS: 'in_progress',
    DONE: 'done',
    ERROR: 'error'
  },
};

export const MONITOR_POLLING_RATE_MS = 3000;

export const STATUS = {
  PUBLISHED: 'status_published',
  UNLISTED: 'status_unlisted',
  PRIVATE: 'status_private',
  MOODLE: 'status_moodle'
};

export const ROLE_KATSOMO_TUOTANTO = 'ROLE_USER_KATSOMO_TUOTANTO';
export const ROLE_KATSOMO = 'ROLE_KATSOMO';
export const ROLE_ANONYMOUS = 'ROLE_ANONYMOUS';
export const ROLE_USER_UNLISTED = 'ROLE_USER_UNLISTED';

export const PUBLICITIES = [
  {
    label: 'collection_unpublished_series',
    value: '',
  },
  {
    label: 'collection_publicity_shareable',
    value: ROLE_USER_UNLISTED,
  },
  {
    label: 'collection_publicity_public',
    value: ROLE_ANONYMOUS,
  },
];

export const FIELD_IS_VALID = false;

export const DELETED_SERIES_REG_EXP = (user) => new RegExp(`^trash ${user}$`);
export const DEFAULT_COLLECTION_TRANSLATION_KEY = 'collections_default';

export const DEFAULT_TITLE = "Unitube-lataamo";

export const KNOWN_LOCATIONS = ['/records', '/collections', '/statistics'];

export const RECORD_EMBED_CODE = (identifier) => `<iframe src="https://unitube.it.helsinki.fi/unitube/embed.html?id=${identifier}" scrolling="no" allowfullscreen="true" frameBorder="0" marginHeight="0px" marginWidth="0px" height="360" width="640"></iframe>`

export const BREAKPOINT = 'xl';

export const LEFT_CONTAINER_ID = 'left-col';
export const RIGHT_CONTAINER_ID = 'right-col';
export const MENU_ICON_ID = 'header-menu-icon';

export const JOB_TYPES_TRANSCRIPTION = 'transcription';
export const JOB_STATUS_STARTED = 'STARTED';

export const MOODLE_NUMBER_LIMIT = 20;
export const FORBIDDEN_CHARACTERS = /[%]/;
