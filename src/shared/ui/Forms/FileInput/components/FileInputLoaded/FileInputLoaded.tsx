import React from "react";
import { FileInputLoadedDocument, FileInputLoadedDocumentProps } from "./FileInputLoadedDocument";
import { FileInputLoadedImage, FileInputLoadedImageProps } from "./FileInputLoadedImage";

export type FileInputLoadedProps = FileInputLoadedImageProps | FileInputLoadedDocumentProps;

export default function FileInputLoaded(props: FileInputLoadedProps) {
    if (props.type === "image") {
        return <FileInputLoadedImage {...props} />;
    }
    return <FileInputLoadedDocument {...props} />;
}
