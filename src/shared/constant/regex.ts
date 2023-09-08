export const REGEXP_PASSWORD = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;
export const REGEXP_TEXTEDITOR_INNER_TEXT = /( |<([^>]+)>)/gi;
export const REGEXP_FILE_EXTENSION = /\.[^.]+$/;

export const REGEXP_INPUT_NUMBER_KEYS = /[+\-eE.]/;
export const REGEXP_INPUT_TEXT = /[^\w\sА-я!@#$;%№":^&?*()[\]\-_=+/\\<>.,`~]/gi;
export const REGEXP_INPUT_FIO = /[^A-zА-я-\s]/gi;
export const REGEXP_INPUT_NUMBER = /[^0-9]/;
export const REGEXP_INPUT_PASSWORD = /[^A-z0-9]/;
