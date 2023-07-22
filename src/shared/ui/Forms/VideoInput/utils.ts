import { VIDEO_FORMATS } from "./constants";

export const isCorrectVideoFormat = (fileType: string) => {
    return Object.keys(VIDEO_FORMATS).find((format) => VIDEO_FORMATS[format as keyof typeof VIDEO_FORMATS] === fileType);
};
