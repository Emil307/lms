import { z } from "zod";

export type UserNotifications = z.infer<typeof $UserNotifications>;

export type UpdateUserNotificationRequest = z.infer<typeof $UpdateUserNotificationRequest>;
export type UpdateUserNotificationResponse = z.infer<typeof $UpdateUserNotificationResponse>;
export type UpdateAdminUserNotificationRequest = z.infer<typeof $UpdateAdminUserNotificationRequest>;
export type UpdateAdminUserNotificationResponse = z.infer<typeof $UpdateAdminUserNotificationResponse>;

export const $UserNotifications = z
    .object({
        newHomework: z.boolean(),
        supportMessage: z.boolean(),
        invoiceForPayment: z.boolean(),
        homeworkChecked: z.boolean(),
        groupAdded: z.boolean(),
    })
    .partial();

export const $UpdateUserNotificationRequest = z.object({
    notification: z.string(),
    isActive: z.boolean(),
});

export const $UpdateUserNotificationResponse = z.object({
    isActive: z.boolean(),
});

export const $UpdateAdminUserNotificationRequest = $UpdateUserNotificationRequest.extend({
    userId: z.string(),
});

export const $UpdateAdminUserNotificationResponse = $UpdateUserNotificationResponse;
