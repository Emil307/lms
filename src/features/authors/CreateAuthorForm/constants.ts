import { InvalidateQueriesKey } from "@shared/types";
import { EntityNames, FilterTypes, QueryKeys } from "@shared/constant";
import { CreateAuthorFormValidation } from "./types";

export const initialValues: CreateAuthorFormValidation = {
    firstName: "",
    lastName: "",
    patronymic: "",
    description: "",
    isActive: false,
    avatar: null,
};

export const keysInvalidateQueries: InvalidateQueriesKey[] = [
    { queryKey: [QueryKeys.GET_ADMIN_AUTHORS] },
    //ресурсы/фильтра
    {
        queryKey: [
            QueryKeys.GET_ADMIN_COURSE_RESOURCES,
            [EntityNames.COURSE, EntityNames.CATEGORY, EntityNames.TAG, EntityNames.AUTHOR, EntityNames.USER],
            { type: FilterTypes.MANIPULATION },
        ],
    },
];
