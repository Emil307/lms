import { EntityNames, QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";
import { GetStaticUsersRequest, StaticUserFromList, userApi } from "@entities/user";

export const useStaticUsers = (data: Omit<GetStaticUsersRequest, "page">, enabled?: boolean) => {
    return useInfiniteRequest<StaticUserFromList>(
        [QueryKeys.GET_STATIC_USERS, [EntityNames.USER, EntityNames.COURSE], data],
        ({ pageParam = 1 }) => userApi.getStaticUsers({ ...data, page: pageParam }),
        { enabled }
    );
};
