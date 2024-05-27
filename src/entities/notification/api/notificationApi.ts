import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $GetNewNotificationsResponse,
    $GetNotificationsResponse,
    $ReadAllNotificationsResponse,
    $UpdateAdminUserNotificationResponse,
    $UpdateUserNotificationResponse,
    GetNewNotificationsResponse,
    GetNotificationsRequest,
    GetNotificationsResponse,
    ReadAllNotificationsResponse,
    UpdateAdminUserNotificationRequest,
    UpdateAdminUserNotificationResponse,
    UpdateUserNotificationRequest,
    UpdateUserNotificationResponse,
} from "./types";

class NotificationApi extends BaseApi {
    //ADMIN LAYER
    async updateAdminUserNotification({
        userId,
        ...data
    }: UpdateAdminUserNotificationRequest): Promise<UpdateAdminUserNotificationResponse> {
        const response = await this.instance.put(`auth/admin/users/${userId}/notifications`, data);
        return $UpdateAdminUserNotificationResponse.parse(response);
    }

    //USER LAYER
    async getNotifications(data: GetNotificationsRequest): Promise<GetNotificationsResponse> {
        const response = await this.instance.post("core/notifications/list", data);
        return $GetNotificationsResponse.parse(response);
    }

    async getNewNotifications(): Promise<GetNewNotificationsResponse> {
        const response = await this.instance.get("core/notifications/new");
        return $GetNewNotificationsResponse.parse(response);
    }

    async updateUserNotification(data: UpdateUserNotificationRequest): Promise<UpdateUserNotificationResponse> {
        const response = await this.instance.put("auth/notifications", data);
        return $UpdateUserNotificationResponse.parse(response);
    }

    async readAllNotifications(): Promise<ReadAllNotificationsResponse> {
        const response = await this.instance.post("core/notifications/read-all");
        return $ReadAllNotificationsResponse.parse(response);
    }
}

export const notificationApi = new NotificationApi(axios);
