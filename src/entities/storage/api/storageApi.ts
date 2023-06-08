import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $UploadedFile } from "@shared/types";
import {
    $DeleteUploadedFileResponse,
    $GetAdminUploadedFileResponse,
    $GetUploadedFileResourcesResponse,
    $GetUploadedFilesResponse,
    DeleteUploadedFileRequest,
    DeleteUploadedFileResponse,
    GetAdminMaterialsNoIncludedArticleRequest,
    GetAdminUploadedFileResponse,
    GetUploadedFileResourcesResponse,
    GetUploadedFilesRequest,
    GetUploadedFilesResponse,
    UpdateUploadedFileActivityRequest,
    UpdateUploadedFilesRequest,
    UploadFileRequest,
    UploadFileResponse,
} from "./types";
import { getFileFormData } from "../utils";

class StorageApi extends BaseApi {
    async uploadAvatar(data: UploadFileRequest): Promise<UploadFileResponse> {
        const response = await this.instance.post("storage/uploads/avatars", getFileFormData(data));
        return $UploadedFile.parse(response);
    }
    async uploadImage(data: UploadFileRequest): Promise<UploadFileResponse> {
        const response = await this.instance.post("storage/uploads/images", getFileFormData(data));
        return $UploadedFile.parse(response);
    }
    async uploadDocument(data: UploadFileRequest): Promise<UploadFileResponse> {
        const response = await this.instance.post("storage/uploads/documents", getFileFormData(data));
        return $UploadedFile.parse(response);
    }
    async uploadVideo(data: UploadFileRequest): Promise<UploadFileResponse> {
        const response = await this.instance.post("storage/uploads/videos", getFileFormData(data));
        return $UploadedFile.parse(response);
    }
    async getAdminUploadedFile(id: number): Promise<GetAdminUploadedFileResponse> {
        const response = await this.instance.get(`storage/files/${id}`);
        return $GetAdminUploadedFileResponse.parse(response);
    }
    async getUploadedFiles(params: GetUploadedFilesRequest | GetAdminMaterialsNoIncludedArticleRequest): Promise<GetUploadedFilesResponse> {
        const response = await this.instance.post("storage/files/list", params);
        return $GetUploadedFilesResponse.parse(response);
    }

    async getUploadedFileResources(): Promise<GetUploadedFileResourcesResponse> {
        const response = await this.instance.get("storage/files/resources");
        return $GetUploadedFileResourcesResponse.parse(response);
    }
    async updateUploadedFileActivity({ id, ...data }: UpdateUploadedFileActivityRequest & { id: number }): Promise<boolean> {
        return this.instance.put(`/storage/files/${id}/activity-status`, data);
    }
    async deleteUploadedFile({ id }: DeleteUploadedFileRequest): Promise<DeleteUploadedFileResponse> {
        const response = await this.instance.delete(`storage/files/${id}`);
        return $DeleteUploadedFileResponse.parse(response);
    }
    //TODO: Убрать void  как бекенд изменить на получение значения
    async updateUploadedFiles(data: UpdateUploadedFilesRequest): Promise<void> {
        return this.instance.put("storage/files", data);
    }
}

export const storageApi = new StorageApi(axios);
