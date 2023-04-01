export const getFileSize = (fileSize: number) => {
    if (fileSize < 1024) {
        return fileSize + "b";
    }
    if (fileSize >= 1024 && fileSize < 1048576) {
        fileSize = fileSize / 1024;
        if (!Number.isInteger(fileSize)) {
            return fileSize.toFixed(1) + "kb";
        }
        return fileSize + "kb";
    }

    fileSize = fileSize / 1048576;
    if (!Number.isInteger(fileSize)) {
        return fileSize.toFixed(1) + "mb";
    }
    return fileSize + "mb";
};
