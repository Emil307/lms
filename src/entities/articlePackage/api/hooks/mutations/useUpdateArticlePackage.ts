import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminArticlePackageDetails, UpdateAdminArticlePackageRequest, articlePackageApi } from "@entities/articlePackage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useUpdateArticlePackage = (id: string) => {
    return useMutation<AdminArticlePackageDetails, AxiosError<FormErrorResponse>, UpdateAdminArticlePackageRequest>(
        [MutationKeys.UPDATE_ARTICLE_PACKAGE, id],
        (data) => articlePackageApi.updateAdminArticlePackage({ ...data, id }),
        {
            // TODO: Пока без оптимистического обновления тк бекенд будет видоизменять AdminArticlePackageDetails
            onSuccess() {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_PACKAGE, id]);
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES]);
            },
        }
    );
};
