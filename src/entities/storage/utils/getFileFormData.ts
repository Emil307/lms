import { UploadFileRequest } from "../api";

export const getFileFormData = (data: UploadFileRequest): FormData => {
    const formData = new FormData();
    formData.append(`file`, data.file);
    if (data.name) {
        formData.append(`name`, data.name);
    }
    if (data.visibility) {
        formData.append(`visibility`, data.visibility);
    }
    if (data.educational) {
        formData.append(`educational`, "1");
    }

    return formData;
};
