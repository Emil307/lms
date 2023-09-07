import React, { memo } from "react";
import FileInputDefaultDocument, { FileInputDefaultDocumentProps } from "./FileInputDefaultDocument/FileInputDefaultDocument";
import FileInputDefaultImage, { FileInputDefaultImageProps } from "./FileInputDefaultImage/FileInputDefaultImage";

export type FileInputDefaultProps = FileInputDefaultDocumentProps | FileInputDefaultImageProps;

const MemoizedFileInputDefault = memo(function FileInputDefault(props: FileInputDefaultProps) {
    if (props.type === "image") {
        return <FileInputDefaultImage {...props} />;
    }
    return <FileInputDefaultDocument {...props} />;
});

export default MemoizedFileInputDefault;
