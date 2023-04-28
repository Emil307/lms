import { useQuery } from "@tanstack/react-query";
import { GetAdminArticlePackagesResourceResponse, articlePackageApi } from "@entities/articlePackage";
import { QueryKeys } from "@shared/constant";

export const useAdminArticlePackageResource = () => {
    return useQuery<GetAdminArticlePackagesResourceResponse>([QueryKeys.GET_ADMIN_ARTICLE_PACKAGE_RESOURCE], () =>
        articlePackageApi.getAdminArticlePackageResource()
    );
};
