import { UploadedFile } from "@shared/types";

export interface FileRejection {
    file: File;
    errors: { code: string; message: string }[];
}

export type InitialFile = {
    fileId: number;
    fileName: string;
    fileSize: number;
    fileUrl: string;
    data: File | UploadedFile;
};

export type LoadedFile = {
    id: number;
    data: File | UploadedFile;
    error?: string;
};

export type FileFormat =
    | "jpg"
    | "rtf"
    | "txt"
    | "png"
    | "jpeg"
    | "pdf"
    | "csv"
    | "gif"
    | "svg"
    | "webp"
    | "mp4"
    | "zip"
    | "doc"
    | "docx"
    | "xls"
    | "xlsx"
    | "ppt"
    | "pptx"
    | "exe"
    | "avi"
    | "mpg";
