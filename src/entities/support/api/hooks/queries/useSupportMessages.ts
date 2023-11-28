import { EntityNames, QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";
import { GetSupportMessagesRequest, SupportMessageFromList, supportApi } from "@entities/support";

export const useSupportMessages = (data: Omit<GetSupportMessagesRequest, "page">) => {
    return useInfiniteRequest<SupportMessageFromList>(
        [QueryKeys.GET_SUPPORT_MESSAGES, [EntityNames.SUPPORT, EntityNames.USER, EntityNames.STUDENT], data],
        ({ pageParam = 1 }) => supportApi.getSupportMessages({ ...data, page: pageParam })
    );
};
