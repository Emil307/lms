import { useQuery } from "@tanstack/react-query";
import { QueryKeys } from "@shared/constant";
import { GetNewNotificationsResponse, notificationApi } from "@entities/notification";

export const useNewNotifications = () => {
    return useQuery<GetNewNotificationsResponse>([QueryKeys.GET_NEW_NOTIFICATIONS], () => notificationApi.getNewNotifications());
};
