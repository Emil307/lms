import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";
import { AdminSupportConversationFromList, GetAdminSupportConversationsRequest, supportApi } from "@entities/support";

export const useAdminSupportConversations = (data: Omit<GetAdminSupportConversationsRequest, "page">) => {
    return useInfiniteRequest<AdminSupportConversationFromList>([QueryKeys.GET_ADMIN_SUPPORT_CONVERSATIONS, data], ({ pageParam = 1 }) =>
        supportApi.getAdminSupportConversations({ ...data, page: pageParam })
    );
};
