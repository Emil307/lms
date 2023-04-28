import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { articlePackageApi } from "@entities/articlePackage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useDeleteArticlePackage = (articlePackageId: string) => {
    return useMutation<void, AxiosError<FormErrorResponse>, null>(
        [MutationKeys.DELETE_ARTICLE_PACKAGE, articlePackageId],
        () => articlePackageApi.deleteArticlePackage(articlePackageId),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES]);
            },
        }
    );
};
