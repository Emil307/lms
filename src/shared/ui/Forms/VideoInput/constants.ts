import { VideoFormat } from "./types";
import { MIME_TYPES } from "../FileInput";

export const DEFAULT_VIDEO_MAX_SIZE = 26214400;

export const VIDEO_FORMATS: { [key in VideoFormat]: string } = {
    mp4: MIME_TYPES.mp4,
};
