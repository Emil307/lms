import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $UpdateAdminUserNotificationResponse,
    $UpdateUserNotificationResponse,
    UpdateAdminUserNotificationRequest,
    UpdateAdminUserNotificationResponse,
    UpdateUserNotificationRequest,
    UpdateUserNotificationResponse,
} from "./types";

class NotificationApi extends BaseApi {
    async updateUserNotification(data: UpdateUserNotificationRequest): Promise<UpdateUserNotificationResponse> {
        const response = await this.instance.put("notifications", data);
        return $UpdateUserNotificationResponse.parse(response);
    }

    async updateAdminUserNotification({
        userId,
        ...data
    }: UpdateAdminUserNotificationRequest): Promise<UpdateAdminUserNotificationResponse> {
        const response = await this.instance.put(`admin/users/${userId}/notifications`, data);
        return $UpdateAdminUserNotificationResponse.parse(response);
    }
}

export const notificationApi = new NotificationApi(axios);
