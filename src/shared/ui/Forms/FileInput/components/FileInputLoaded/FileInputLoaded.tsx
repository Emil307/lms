import React from "react";
import { FileInputLoadedDocument, FileInputLoadedDocumentProps } from "./FileInputLoadedDocument";
import { FileInputLoadedImage, FileInputLoadedImageProps } from "./FileInputLoadedImage";
import { FileInputLoadedVideo, FileInputLoadedVideoProps } from "./FileInputLoadedVideo";

export type FileInputLoadedProps = FileInputLoadedImageProps | FileInputLoadedDocumentProps | FileInputLoadedVideoProps;

export default function FileInputLoaded(props: FileInputLoadedProps) {
    if (props.type === "document") {
        return <FileInputLoadedDocument {...props} />;
    }
    if (props.type === "video") {
        return <FileInputLoadedVideo {...props} />;
    }
    return <FileInputLoadedImage {...props} />;
}
