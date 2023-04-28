import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { AdminArticlePackageDetails, articlePackageApi } from "@entities/articlePackage";

export const useAdminArticlePackage = (id?: string) => {
    return useQuery<AdminArticlePackageDetails>([QueryKeys.GET_ADMIN_ARTICLE_PACKAGE], () => articlePackageApi.getAdminArticlePackage(id), {
        enabled: !!id,
    });
};
