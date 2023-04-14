import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { AdminTag, CreateAdminTagRequest, tagApi } from "@entities/tag";
import { queryClient } from "@app/providers";

export const useCreateTag = () => {
    return useMutation<AdminTag, AxiosError<FormErrorResponse>, CreateAdminTagRequest>(
        [MutationKeys.CREATE_TAG],
        (data) => tagApi.createAdminTag(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_TAGS]);
            },
        }
    );
};
