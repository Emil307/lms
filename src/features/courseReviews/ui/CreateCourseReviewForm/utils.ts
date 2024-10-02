import { EntityNames, QueryKeys } from "@shared/constant";

export const getKeysInvalidateQueries = (groupId: string) => {
    return [
        {
            queryKey: [
                QueryKeys.GET_GROUP,
                [EntityNames.GROUP, EntityNames.COURSE, EntityNames.LESSON, EntityNames.CATEGORY, EntityNames.TAG],
                groupId,
            ],
        },
        {
            queryKey: [QueryKeys.GET_GROUPS],
        },
    ];
};
