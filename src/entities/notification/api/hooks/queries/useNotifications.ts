import { QueryKeys } from "@shared/constant";
import { useInfiniteRequest } from "@shared/utils";
import { GetNotificationsRequest, NotificationFromList, notificationApi } from "@entities/notification";
import { queryClient } from "@app/providers";

export const useNotifications = (params: Omit<GetNotificationsRequest, "page">) => {
    return useInfiniteRequest<NotificationFromList>(
        [QueryKeys.GET_NOTIFICATIONS, params],
        ({ pageParam = 1 }) => notificationApi.getNotifications({ ...params, page: pageParam }),
        {
            onSuccess: () => {
                queryClient.invalidateQueries([QueryKeys.GET_NEW_NOTIFICATIONS]);
            },
        }
    );
};
