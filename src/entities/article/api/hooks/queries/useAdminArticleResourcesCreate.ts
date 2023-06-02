import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { articleApi, GetAdminArticleResourcesCreateResponse } from "@entities/article";

export const useAdminArticleResourcesCreate = () => {
    return useQuery<GetAdminArticleResourcesCreateResponse>([QueryKeys.GET_ADMIN_ARTICLE_RESOURCES_CREATE], () =>
        articleApi.getAdminArticleResourcesCreate()
    );
};
