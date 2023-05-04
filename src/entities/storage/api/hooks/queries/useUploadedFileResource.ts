import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetUploadedFileResourceResponse, storageApi } from "@entities/storage";

export const useUploadedFileResource = () => {
    return useQuery<GetUploadedFileResourceResponse>([QueryKeys.GET_UPLOADED_FILE_RESOURCE], () => storageApi.getUploadedFileResource());
};
