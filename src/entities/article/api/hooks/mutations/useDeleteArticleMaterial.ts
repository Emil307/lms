import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteAdminArticleMaterialRequest, articleApi } from "@entities/article";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useDeleteArticleMaterial = (data: DeleteAdminArticleMaterialRequest) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ARTICLE_MATERIAL, data],
        () => articleApi.deleteArticleMaterial(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_MATERIALS]);
            },
        }
    );
};
