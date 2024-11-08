import { AvatarFileFormat } from "@shared/ui";

export const DEFAULT_MAX_FILE_SIZE = 512000;

export const MIME_TYPES: { [key in AvatarFileFormat]: string } = {
    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
};

export const getCorrectFileFormats = (formats?: AvatarFileFormat[]) => formats?.map((format) => MIME_TYPES[format]).join(",");

export const isCorrectLoadedFileFormat = (file: File, formats: AvatarFileFormat[]) => {
    if (!formats.length) return true;
    return formats.find((format) => MIME_TYPES[format] === file.type);
};
