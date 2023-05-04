import { useQuery } from "@tanstack/react-query";
import { storageApi } from "@entities/storage";
import { QueryKeys } from "@shared/constant";

export const useUploadedFile = (id: number) => {
    return useQuery([QueryKeys.GET_UPLOADED_FILE, id], () => storageApi.getUploadedFile(id));
};
