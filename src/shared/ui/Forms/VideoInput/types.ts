import { UploadedFile } from "@shared/types";
import { FileFormat } from "@shared/ui";

export type TUploadedFile = {
    data: UploadedFile;
    number: number;
};

export type TFile = {
    data: File;
    number: number;
};

export type VideoFormat = Extract<FileFormat, "mp4">;
