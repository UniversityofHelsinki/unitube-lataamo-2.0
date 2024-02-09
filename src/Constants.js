export const DEFAULT_LICENSES = ['UNITUBE_ALLRIGHTS', 'CC_BY', 'CC_BY_NC_ND', 'CC0'];
export const DEFAULT_LANGUAGE_MODELS = ['ms_whisper', 'ms_asr'];
export const DEFAULT_LANGUAGES = ['language_select_fi', 'language_select_sv', 'language_select_en'];

export const MAX_FILE_SIZE_LIMIT = 2.5e+10;
export const MIN_VIDEO_DURATION = 1;

export const ACCEPTED_MIME_TYPES = "video/mp4,video/x-m4v,video/*";

export const ACCEPTED_VTT_MIME_TYPES = "vtt, srt";

export const DATE_FORMAT = "dd.MM.yyyy";

export const DELETION_DATE_MIN_MONTHS = 6;
export const DELETION_DATE_MAX_YEARS = 3;

export const ProgressStatus = {
  NOT_STARTED: 'not_started',
  SENDING: 'sending',
  ERROR: 'error',
  DONE: 'done',
  ABORTED: 'aborted',
  PROCESSING: 'processing'
};

export const PUBLICITIES = [
  {
    label: 'collection_unpublished_series',
    value: '',
  },
  {
    label: 'collection_publicity_shareable',
    value: 'ROLE_USER_UNLISTED',
  },
  {
    label: 'collection_publicity_public',
    value: 'ROLE_ANONYMOUS',
  },
];

export const MONITOR_POLLING_RATE_MS = 3000;
