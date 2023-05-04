import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $uploadedFile, UploadedFile } from "@shared/ui";
import {
    $getUploadedFileResourceResponse,
    $getUploadedFilesResponse,
    $uploadedMaterialFileDetails,
    GetMaterialsRequestParams,
    GetUploadedFileResourceResponse,
    GetUploadedFilesResponse,
    UpdateActivityStatusUploadedFileRequest,
    UpdateUploadedFilesRequest,
    UploadFileRequest,
    UploadedMaterialFileDetails,
} from "./types";
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
    async getUploadedFile(id: number): Promise<UploadedMaterialFileDetails> {
        const response = await this.instance.get(`storage/files/${id}`);
        return $uploadedMaterialFileDetails.parse(response);
    }
    async getUploadedFiles({
        isActive,
        categoryIds,
        type,
        createdAt,
        ...params
    }: GetMaterialsRequestParams): Promise<GetUploadedFilesResponse> {
        const response = await this.instance.post("storage/files/list", {
            ...params,
            filter: {
                isActive,
                "type.type": type,
                createdAt,
                categoryIds,
            },
        });
        return $getUploadedFilesResponse.parse(response);
    }

    async getUploadedFileResource(): Promise<GetUploadedFileResourceResponse> {
        const response = await this.instance.get("storage/files/resources");
        return $getUploadedFileResourceResponse.parse(response);
    }
    async updateActivityStatusUploadedFile({ id, ...data }: UpdateActivityStatusUploadedFileRequest & { id: number }): Promise<boolean> {
        return this.instance.put(`/storage/files/${id}/activity-status`, data);
    }
    async deleteUploadedFile(id: string): Promise<null> {
        return this.instance.delete(`storage/files/${id}`);
    }
    //TODO: Убрать void  как бекенд изменить на получение значения
    async updateUploadedFiles(data: UpdateUploadedFilesRequest): Promise<void> {
        return this.instance.put("storage/files", data);
    }
}

export const storageApi = new StorageApi(axios);
