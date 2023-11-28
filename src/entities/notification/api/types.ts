import { z } from "zod";
import { $User } from "@entities/user";
import { $Profile, $UploadedFile, $getFiltersRequestType, $getPaginationResponseType } from "@shared/types";

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
export type NotificationUser = z.infer<typeof $NotificationUser>;

export type NotificationSupportMessageType = z.infer<typeof $NotificationSupportMessageType>;
export type NotificationHomeworkMessageType = z.infer<typeof $NotificationHomeworkMessageType>;
export type NotificationNewHomeworkType = z.infer<typeof $NotificationNewHomeworkType>;
export type NotificationHomeworkCheckedType = z.infer<typeof $NotificationHomeworkCheckedType>;
export type NotificationGroupAddedType = z.infer<typeof $NotificationGroupAddedType>;
export type NotificationInvoiceForPaymentType = z.infer<typeof $NotificationInvoiceForPaymentType>;

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

export const $NotificationUser = $User
    .pick({
        id: true,
        roles: true,
    })
    .extend({
        profile: $Profile
            .pick({
                firstName: true,
                lastName: true,
                patronymic: true,
            })
            .extend({
                avatar: $UploadedFile
                    .pick({
                        id: true,
                        name: true,
                        absolutePath: true,
                    })
                    .nullable(),
            }),
    });

export const $NotificationSupportMessageType = z.object({
    type: z.literal("supportMessage"),
    message: z.string(),
    sender: $NotificationUser,
});

export const $NotificationHomeworkMessageType = z.object({
    type: z.literal("homeworkMessage"),
    groupId: z.number(),
    homeworkAnswerId: z.number(),
    lessonId: z.number(),
    lessonName: z.string(),
    content: z.string(),
    sender: $NotificationUser,
});

export const $NotificationNewHomeworkType = z.object({
    type: z.literal("newHomework"),
    homeworkAnswerId: z.number(),
    lessonName: z.string(),
    sender: $NotificationUser,
});

export const $NotificationHomeworkCheckedType = z.object({
    type: z.literal("homeworkChecked"),
    groupId: z.number(),
    homeworkAnswerId: z.number(),
    lessonId: z.number(),
    lessonName: z.string(),
    sender: $NotificationUser,
});

export const $NotificationGroupAddedType = z.object({
    type: z.literal("groupAdded"),
    course: z.object({
        id: z.number(),
        name: z.string(),
    }),
    groupId: z.number(),
    teacher: $NotificationUser,
});

export const $NotificationInvoiceForPaymentType = z.object({
    type: z.literal("invoiceForPayment"),
    entity: z.object({
        id: z.number(),
        name: z.string(),
    }),
    student: $NotificationUser,
});

export const $NotificationType = z.union([
    $NotificationSupportMessageType,
    $NotificationHomeworkMessageType,
    $NotificationNewHomeworkType,
    $NotificationHomeworkCheckedType,
    $NotificationGroupAddedType,
    $NotificationInvoiceForPaymentType,
]);

export const $NotificationBase = z.object({
    id: z.number(),
    createdAt: z.coerce.date(),
    isNew: z.boolean(),
});

export const $Notification = z.intersection($NotificationBase, $NotificationType);

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
