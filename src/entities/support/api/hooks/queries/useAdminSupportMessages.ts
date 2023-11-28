import { EntityNames, QueryKeys } from "@shared/constant";
import { invalidateQueriesWithPredicate, useInfiniteRequest } from "@shared/utils";
import { AdminSupportMessageFromList, GetAdminSupportMessagesRequest, supportApi } from "@entities/support";

export const useAdminSupportMessages = (data: Omit<GetAdminSupportMessagesRequest, "page">) => {
    return useInfiniteRequest<AdminSupportMessageFromList>(
        [QueryKeys.GET_ADMIN_SUPPORT_MESSAGES, [EntityNames.SUPPORT, EntityNames.STUDENT, EntityNames.USER], data],
        ({ pageParam = 1 }) => supportApi.getAdminSupportMessages({ ...data, page: pageParam }),
        {
            enabled: !!data.conversationId,
            onSuccess: () => {
                invalidateQueriesWithPredicate({ entityName: EntityNames.NOTIFICATION });
            },
        }
    );
};
