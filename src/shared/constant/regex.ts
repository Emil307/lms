export const REGEXP_PASSWORD = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()?])[a-zA-Z\d!@#$%^&*()?]{8,}$/;
export const REGEXP_TEXTEDITOR_INNER_TEXT = /( |<([^>]+)>)/gi;
export const REGEXP_FILE_EXTENSION = /\.[^.]+$/;

export const REGEXP_INPUT_NUMBER_KEYS = /[+\-eE.]/;
export const REGEXP_INPUT_TEXT = /[^\w\sА-я!@#$;%№":^&?*()[\]\-=+/\\<>.,`~]/gi;
export const REGEXP_INPUT_FIO = /[^A-zА-я-\s]/gi;
export const REGEXP_INPUT_NUMBER = /\D/;
export const REGEXP_INPUT_PASSWORD = /[^A-z\d!@#$%^&*()?]/;
