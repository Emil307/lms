import { useQuery } from "@tanstack/react-query";
import { GetAdminArticlePackageFiltersResponse, articlePackageApi } from "@entities/articlePackage";
import { QueryKeys } from "@shared/constant";

export const useAdminArticlePackageFilters = () => {
    return useQuery<GetAdminArticlePackageFiltersResponse>([QueryKeys.GET_ADMIN_ARTICLE_PACKAGE_FILTERS], () =>
        articlePackageApi.getAdminArticlePackageFilters(),
    );
};
