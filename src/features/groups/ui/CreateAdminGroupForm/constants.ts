import { EntityNames, FilterTypes, QueryKeys } from "@shared/constant";
import { InvalidateQueriesKey } from "@shared/types";

export const keysInvalidateQueries: InvalidateQueriesKey[] = [
    { queryKey: [QueryKeys.GET_ADMIN_GROUPS] },
    { queryKey: [QueryKeys.GET_GROUPS] },
    { queryKey: [QueryKeys.GET_GROUPS_COUNTS] },
    //ресурсы/фильтра
    {
        queryKey: [
            QueryKeys.GET_ADMIN_GROUP_FILTERS,
            [EntityNames.GROUP, EntityNames.COURSE, EntityNames.USER],
            { type: FilterTypes.MANIPULATION },
        ],
    },
];
