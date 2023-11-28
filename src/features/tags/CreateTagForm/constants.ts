import { EntityNames, FilterTypes, QueryKeys } from "@shared/constant";
import { InvalidateQueriesKey } from "@shared/types";
import { CreateTagFormValidation } from "./types";

export const initialValues: CreateTagFormValidation = {
    name: "",
};

export const keysInvalidateQueries: InvalidateQueriesKey[] = [
    { queryKey: [QueryKeys.GET_ADMIN_TAGS] },
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
];
