import { axios } from "@app/config/axios";
import { BaseApi } from "@shared/utils";
import {
    $UpdateUserNotificationResponse,
    UpdateUserNotificationRequest,
    UpdateUserNotificationResponse,
} from "./types";

class NotificationApi extends BaseApi {
    async updateUserNotification(data: UpdateUserNotificationRequest): Promise<UpdateUserNotificationResponse> {
        const response = await this.instance.put("notifications", data);
        return $UpdateUserNotificationResponse.parse(response);
    }

}

export const notificationApi = new NotificationApi(axios);
