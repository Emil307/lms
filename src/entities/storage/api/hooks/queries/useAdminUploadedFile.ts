import { useQuery } from "@tanstack/react-query";
import { GetAdminUploadedFileResponse, storageApi } from "@entities/storage";
import { QueryKeys } from "@shared/constant";

export const useAdminUploadedFile = (id: number) => {
    return useQuery<GetAdminUploadedFileResponse>([QueryKeys.GET_ADMIN_UPLOADED_FILE, id], () => storageApi.getAdminUploadedFile(id));
};
