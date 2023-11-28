import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetUploadedFileResourcesResponse, storageApi } from "@entities/storage";
import { FormErrorResponse } from "@shared/types";

export const useUploadedFileResources = (): UseQueryResult<GetUploadedFileResourcesResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_UPLOADED_FILE_RESOURCE, [EntityNames.MATERIAL, EntityNames.CATEGORY]], () =>
        storageApi.getUploadedFileResources()
    );
};
