import { useQuery } from "@tanstack/react-query";
import { GetAdminArticlePackageResourcesCreateResponse, articlePackageApi } from "@entities/articlePackage";
import { QueryKeys } from "@shared/constant";

export const useAdminArticlePackageResourcesCreate = () => {
    return useQuery<GetAdminArticlePackageResourcesCreateResponse>([QueryKeys.GET_ADMIN_ARTICLE_PACKAGE_RESOURCES_CREATE], () =>
        articlePackageApi.getAdminArticlePackageResourcesCreate(),
    );
};
