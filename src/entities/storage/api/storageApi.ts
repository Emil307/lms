import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $uploadedFile, UploadedFile } from "@shared/ui";
import { UploadFileRequest } from "./types";
import { getFileFormData } from "../utils";

class StorageApi extends BaseApi {
    async uploadAvatar(data: UploadFileRequest): Promise<UploadedFile> {
        const response = await this.instance.post("storage/uploads/avatars", getFileFormData(data));
        return $uploadedFile.parse(response);
    }
    async uploadImage(data: UploadFileRequest): Promise<UploadedFile> {
        const response = await this.instance.post("storage/uploads/images", getFileFormData(data));
        return $uploadedFile.parse(response);
    }

    async uploadDocument(data: UploadFileRequest): Promise<UploadedFile> {
        const response = await this.instance.post("storage/uploads/documents", getFileFormData(data));
        return $uploadedFile.parse(response);
    }
    async uploadVideo(data: UploadFileRequest): Promise<UploadedFile> {
        const response = await this.instance.post("storage/uploads/videos", getFileFormData(data));
        return $uploadedFile.parse(response);
    }
}

export const storageApi = new StorageApi(axios);
