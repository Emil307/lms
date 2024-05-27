import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import { $UploadedFile } from "@shared/types";
import {
    $DeleteUploadedFileResponse,
    $GetAdminUploadedFileResponse,
    $GetUploadedFileResourcesResponse,
    $GetUploadedFilesResponse,
    $UpdateUploadedFileActivityResponse,
    $UpdateUploadedFilesResponse,
    DeleteUploadedFileRequest,
    DeleteUploadedFileResponse,
    GetAdminMaterialsNoIncludedArticleRequest,
    GetAdminMaterialsNoIncludedLessonRequest,
    GetAdminUploadedFileResponse,
    GetUploadedFileResourcesResponse,
    GetUploadedFilesRequest,
    GetUploadedFilesResponse,
    UpdateUploadedFileActivityRequest,
    UpdateUploadedFileActivityResponse,
    UpdateUploadedFilesRequest,
    UpdateUploadedFilesResponse,
    UploadFileRequest,
    UploadFileResponse,
} from "./types";
import { getFileFormData } from "../utils";

class StorageApi extends BaseApi {
    async uploadAvatar(data: UploadFileRequest): Promise<UploadFileResponse> {
        const response = await this.instance.post("core/storage/uploads/avatars", getFileFormData(data));
        return $UploadedFile.parse(response);
    }
    async uploadImage(data: UploadFileRequest): Promise<UploadFileResponse> {
        const response = await this.instance.post("core/storage/uploads/images", getFileFormData(data));
        return $UploadedFile.parse(response);
    }
    async uploadDocument(data: UploadFileRequest): Promise<UploadFileResponse> {
        const response = await this.instance.post("core/storage/uploads/documents", getFileFormData(data));
        return $UploadedFile.parse(response);
    }
    async uploadVideo(data: UploadFileRequest): Promise<UploadFileResponse> {
        const response = await this.instance.post("core/storage/uploads/videos", getFileFormData(data));
        return $UploadedFile.parse(response);
    }
    async getAdminUploadedFile(id: number): Promise<GetAdminUploadedFileResponse> {
        const response = await this.instance.get(`core/storage/files/${id}`);
        return $GetAdminUploadedFileResponse.parse(response);
    }
    async getUploadedFiles(
        params: GetUploadedFilesRequest | GetAdminMaterialsNoIncludedArticleRequest | GetAdminMaterialsNoIncludedLessonRequest
    ): Promise<GetUploadedFilesResponse> {
        const response = await this.instance.post("core/storage/files/list", params);
        return $GetUploadedFilesResponse.parse(response);
    }

    async getUploadedFileResources(): Promise<GetUploadedFileResourcesResponse> {
        const response = await this.instance.get("core/storage/files/resources");
        return $GetUploadedFileResourcesResponse.parse(response);
    }
    async updateUploadedFileActivity({ id, ...data }: UpdateUploadedFileActivityRequest): Promise<UpdateUploadedFileActivityResponse> {
        const response = await this.instance.put(`core/storage/files/${id}/activity-status`, data);
        return $UpdateUploadedFileActivityResponse.parse(response);
    }
    async deleteUploadedFile({ id }: DeleteUploadedFileRequest): Promise<DeleteUploadedFileResponse> {
        const response = await this.instance.delete(`core/storage/files/${id}`);
        return $DeleteUploadedFileResponse.parse(response);
    }
    async updateUploadedFiles(data: UpdateUploadedFilesRequest): Promise<UpdateUploadedFilesResponse> {
        const response = await this.instance.put("core/storage/files", data);
        return $UpdateUploadedFilesResponse.parse(response);
    }
}

export const storageApi = new StorageApi(axios);
