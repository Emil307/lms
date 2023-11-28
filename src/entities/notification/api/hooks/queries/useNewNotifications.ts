import { UseQueryResult, useQuery } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { EntityNames, QueryKeys } from "@shared/constant";
import { GetNewNotificationsResponse, notificationApi } from "@entities/notification";
import { FormErrorResponse } from "@shared/types";
import { queryClient } from "@app/providers";
import { REFETCH_NOTIFICATIONS_INTERVAL } from "../../constants";

export const useNewNotifications = (): UseQueryResult<GetNewNotificationsResponse, AxiosError<FormErrorResponse>> => {
    return useQuery([QueryKeys.GET_NEW_NOTIFICATIONS, [EntityNames.SUPPORT]], () => notificationApi.getNewNotifications(), {
        onSuccess: ({ hasNew }) => {
            if (hasNew) {
                queryClient.invalidateQueries([QueryKeys.GET_NOTIFICATIONS]);
            }
        },
        refetchInterval: REFETCH_NOTIFICATIONS_INTERVAL,
    });
};
