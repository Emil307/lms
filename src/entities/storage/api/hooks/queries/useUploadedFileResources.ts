import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetUploadedFileResourcesResponse, storageApi } from "@entities/storage";

export const useUploadedFileResources = () => {
    return useQuery<GetUploadedFileResourcesResponse>([QueryKeys.GET_UPLOADED_FILE_RESOURCE], () => storageApi.getUploadedFileResources());
};
