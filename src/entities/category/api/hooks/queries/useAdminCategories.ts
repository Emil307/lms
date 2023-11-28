import { AdminCategoryFromList, categoryApi, GetAdminCategoriesRequest } from "@entities/category";
import { EntityNames, QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";

export const useAdminCategories = (params: GetAdminCategoriesRequest) => {
    return useInfiniteRequest<AdminCategoryFromList>(
        [QueryKeys.GET_ADMIN_CATEGORIES, [EntityNames.CATEGORY], params],
        ({ pageParam = 1 }) => categoryApi.getAdminCategories({ ...params, page: pageParam })
    );
};
