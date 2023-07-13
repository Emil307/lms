import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";
import { AdminSupportMessageFromList, GetAdminSupportMessagesRequest, supportApi } from "@entities/support";

export const useAdminSupportMessages = (data: Omit<GetAdminSupportMessagesRequest, "page">) => {
    return useInfiniteRequest<AdminSupportMessageFromList>(
        [QueryKeys.GET_ADMIN_SUPPORT_MESSAGES, data],
        ({ pageParam = 1 }) => supportApi.getAdminSupportMessages({ ...data, page: pageParam }),
        { enabled: !!data.conversationId }
    );
};
