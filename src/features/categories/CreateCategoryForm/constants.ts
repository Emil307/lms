import { InvalidateQueriesKey } from "@shared/types";
import { EntityNames, FilterTypes, QueryKeys } from "@shared/constant";
import { CreateAdminCategoryFormValidation } from "./types";

export const initialValues: CreateAdminCategoryFormValidation = {
    name: "",
    parentId: null,
};

export const keysInvalidateQueries: InvalidateQueriesKey[] = [
    { queryKey: [QueryKeys.GET_ADMIN_CATEGORIES] },
    { queryKey: [QueryKeys.GET_ADMIN_SUBCATEGORIES] },
    { queryKey: [QueryKeys.GET_ADMIN_SUBCATEGORIES_PAGINATE] },
    //ресурсы/фильтра
    { queryKey: [QueryKeys.GET_ADMIN_ARTICLE_RESOURCES_CREATE] },
    { queryKey: [QueryKeys.GET_ADMIN_ARTICLE_PACKAGE_RESOURCES_CREATE] },
    {
        queryKey: [
            QueryKeys.GET_ADMIN_COURSE_RESOURCES,
            [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.AUTHOR, EntityNames.USER],
            { type: FilterTypes.MANIPULATION },
        ],
    },
    {
        queryKey: [
            QueryKeys.GET_COURSE_RESOURCES,
            [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG],
            { type: FilterTypes.MANIPULATION },
        ],
    },
    { queryKey: [QueryKeys.GET_UPLOADED_FILE_RESOURCE] },
];
