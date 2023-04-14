import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { tagApi } from "@entities/tag";
import { queryClient } from "@app/providers";

export const useDeleteTag = (tagId: string) => {
    return useMutation<null, AxiosError<FormErrorResponse>, null>([MutationKeys.DELETE_TAG, tagId], () => tagApi.deleteTag(tagId), {
        onSuccess: () => {
            queryClient.invalidateQueries([QueryKeys.GET_ADMIN_TAGS]);
        },
    });
};
