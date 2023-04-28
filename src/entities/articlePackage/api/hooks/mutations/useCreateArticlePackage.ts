import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { AdminArticlePackageDetails, CreateAdminArticlePackageRequest, articlePackageApi } from "@entities/articlePackage";
import { MutationKeys, QueryKeys } from "@shared/constant";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";

export const useCreateArticlePackage = () => {
    return useMutation<AdminArticlePackageDetails, AxiosError<FormErrorResponse>, CreateAdminArticlePackageRequest>(
        [MutationKeys.CREATE_ARTICLE_PACKAGE],
        (data: CreateAdminArticlePackageRequest) => articlePackageApi.createAdminArticlePackage(data),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES]);
            },
        }
    );
};
