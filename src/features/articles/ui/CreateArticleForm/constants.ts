import { GetAdminSubCategoriesRequest } from "@entities/category";
import { QueryKeys } from "@shared/constant";
import { InvalidateQueriesKey } from "@shared/types";
import { CreateArticleFormValidation } from "./types";

export const initialParams: Omit<GetAdminSubCategoriesRequest, "filter"> = {
    page: 1,
    perPage: 10,
    paginate: false,
};

export const initialValues: CreateArticleFormValidation = {
    name: "",
    content: "",
    isActive: true,
    categoryId: "",
    subcategories: [],
    tags: [],
};

export const keysInvalidateQueries: InvalidateQueriesKey[] = [
    { queryKey: [QueryKeys.GET_ARTICLES] },
    { queryKey: [QueryKeys.GET_ADMIN_ARTICLES] },
    { queryKey: [QueryKeys.GET_ADMIN_ARTICLES_INFINITY] },
    //ресурсы/фильтра
    { queryKey: [QueryKeys.GET_ARTICLES_FILTERS] },
    { queryKey: [QueryKeys.GET_ADMIN_ARTICLE_FILTERS] },
];
