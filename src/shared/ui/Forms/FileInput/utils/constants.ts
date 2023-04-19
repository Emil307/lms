import { FileFormat } from "./types";

export const DEFAULT_MAX_FILE_SIZE = 26214400;
export const DEFAULT_IMAGE_MAX_WIDTH = 1320;
export const DEFAULT_IMAGE_MAX_HEIGHT = 292;

export const MIME_TYPES: { [key in FileFormat]: string } = {
    png: "image/png",
    gif: "image/gif",
    jpeg: "image/jpeg",
    jpg: "image/jpeg",
    txt: "text/plain",
    rtf: "application/rtf",
    svg: "image/svg+xml",
    webp: "image/webp",
    mp4: "video/mp4",
    zip: "application/zip",
    csv: "text/csv",
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ppt: "application/vnd.ms-powerpoint",
    pptx: "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    exe: "application/vnd.microsoft.portable-executable",
};

export const getCorrectFileFormatsForDropZone = (formats: FileFormat[]) => formats.map((format) => MIME_TYPES[format]);

export const getCorrectFileFormatsForInput = (formats?: FileFormat[]) => formats?.map((format) => MIME_TYPES[format]);

export const isCorrectLoadedFileFormat = (file: File, formats: FileFormat[]) => {
    if (!formats.length) return true;
    return formats.find((format) => MIME_TYPES[format] === file.type);
};

export const getFileExtension = (fileName: string) => {
    return fileName.split(".").pop()?.toUpperCase();
};
