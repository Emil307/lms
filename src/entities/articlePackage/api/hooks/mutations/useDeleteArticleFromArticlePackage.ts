import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { DeleteAdminArticleFromPackageRequest, articlePackageApi } from "@entities/articlePackage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useDeleteArticleFromArticlePackage = (params: DeleteAdminArticleFromPackageRequest) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ARTICLE_FROM_ARTICLE_PACKAGE, params],
        () => articlePackageApi.deleteArticleFromArticlePackage(params),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLES_FROM_ARTICLE_PACKAGE]);
            },
        }
    );
};
