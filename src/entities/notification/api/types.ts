import { z } from "zod";
import { $User } from "@entities/user";
import { $Profile, $getFiltersRequestType, $getPaginationResponseType } from "@shared/types";

/**
 *
 * ADMIN TYPES
 *
 */
export type UpdateAdminUserNotificationRequest = z.infer<typeof $UpdateAdminUserNotificationRequest>;
export type UpdateAdminUserNotificationResponse = z.infer<typeof $UpdateAdminUserNotificationResponse>;

/**
 *
 * USER TYPES
 *
 */
export type Notification = z.infer<typeof $Notification>;
export type NotificationFromList = z.infer<typeof $NotificationFromList>;
export type NotificationType = z.infer<typeof $NotificationType>;

//REQ/RESP
export type GetNotificationsRequest = z.infer<typeof $GetNotificationsRequest>;
export type GetNotificationsResponse = z.infer<typeof $GetNotificationsResponse>;
export type UpdateUserNotificationRequest = z.infer<typeof $UpdateUserNotificationRequest>;
export type UpdateUserNotificationResponse = z.infer<typeof $UpdateUserNotificationResponse>;
export type GetNewNotificationsResponse = z.infer<typeof $GetNewNotificationsResponse>;
export type ReadAllNotificationsResponse = z.infer<typeof $ReadAllNotificationsResponse>;

/**
 *
 * ADMIN ZOD
 *
 */
export const $UpdateAdminUserNotificationRequest = z.object({
    userId: z.string(),
    notification: z.string(),
    isActive: z.boolean(),
});

export const $UpdateAdminUserNotificationResponse = z.object({
    isActive: z.boolean(),
});

/**
 *
 * USER ZOD
 *
 */

//TODO: Добавить типы как бекенд добавит новые типы (supportMessage  - ТОЛЬКО ЭТОТ тип РЕАЛЕН! )
export const $NotificationType = z
    .literal("supportMessage")
    .or(z.literal("paymentMessage"))
    .or(z.literal("homeworkMessage"))
    .or(z.literal("unlockCourse"))
    .or(z.literal("unlockFreeCourse"));

export const $Notification = z.object({
    id: z.number(),
    type: $NotificationType,
    createdAt: z.coerce.date(),
    isNew: z.boolean(),
    sender: $User
        .pick({
            id: true,
            roles: true,
        })
        .extend({
            profile: $Profile.pick({
                firstName: true,
                lastName: true,
                patronymic: true,
                avatar: true,
            }),
        }),
});

export const $NotificationFromList = $Notification;

export const $NotificationsRequest = z.object({});

export const $GetNotificationsRequest = $getFiltersRequestType($NotificationsRequest);

export const $GetNotificationsResponse = $getPaginationResponseType($NotificationFromList);

export const $UpdateUserNotificationRequest = $UpdateAdminUserNotificationRequest.pick({
    notification: true,
    isActive: true,
});

export const $UpdateUserNotificationResponse = $UpdateAdminUserNotificationResponse;

export const $GetNewNotificationsResponse = z.object({
    hasNew: z.boolean(),
});

export const $ReadAllNotificationsResponse = z.null();
