import { EntityNames, QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";
import { AdminSupportConversationFromList, GetAdminSupportConversationsRequest, supportApi } from "@entities/support";

export const useAdminSupportConversations = (data: Omit<GetAdminSupportConversationsRequest, "page">, enabled = false) => {
    return useInfiniteRequest<AdminSupportConversationFromList>(
        [QueryKeys.GET_ADMIN_SUPPORT_CONVERSATIONS, [EntityNames.SUPPORT, EntityNames.USER, EntityNames.STUDENT], data],
        ({ pageParam = 1 }) => supportApi.getAdminSupportConversations({ ...data, page: pageParam }),
        {
            enabled,
        }
    );
};
