import React, { memo } from "react";
import FileInputDefaultDocument, { FileInputDefaultDocumentProps } from "./FileInputDefaultDocument/FileInputDefaultDocument";
import FileInputDefaultImage, { FileInputDefaultImageProps } from "./FileInputDefaultImage/FileInputDefaultImage";

export type FileInputDefaultProps = FileInputDefaultDocumentProps | FileInputDefaultImageProps;

const MemoizedFileInputDefault = memo(function FileInputDefault(props: FileInputDefaultProps) {
    if (props.type === "document") {
        return <FileInputDefaultDocument {...props} />;
    }
    return <FileInputDefaultImage {...props} />;
});

export default MemoizedFileInputDefault;
