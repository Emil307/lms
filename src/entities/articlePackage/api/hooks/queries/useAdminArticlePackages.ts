import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminArticlePackagesRequestParams, GetAdminArticlePackagesResponse, articlePackageApi } from "@entities/articlePackage";

export const useAdminArticlePackages = (params: GetAdminArticlePackagesRequestParams) => {
    return useQuery<GetAdminArticlePackagesResponse>([QueryKeys.GET_ADMIN_ARTICLE_PACKAGES], () =>
        articlePackageApi.getAdminArticlePackages(params)
    );
};
