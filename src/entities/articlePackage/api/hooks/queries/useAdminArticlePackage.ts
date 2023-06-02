import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetAdminArticlePackageResponse, articlePackageApi } from "@entities/articlePackage";

export const useAdminArticlePackage = (id?: string) => {
    return useQuery<GetAdminArticlePackageResponse>(
        [QueryKeys.GET_ADMIN_ARTICLE_PACKAGE, id],
        () => articlePackageApi.getAdminArticlePackage(id),
        {
            enabled: !!id,
        }
    );
};
