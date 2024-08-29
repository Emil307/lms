import { getFileExtension, MIME_TYPES_IMAGE, MIME_TYPES_VIDEO } from "../../../utils";

export const getFileTypeRequestByExtension = (filename: string) => {
    if (MIME_TYPES_IMAGE.includes(getFileExtension(filename))) {
        return "image";
    }
    if (MIME_TYPES_VIDEO.includes(getFileExtension(filename))) {
        return "video";
    }
    return "document";
};
