import { z } from "zod";

export type UserNotifications = z.infer<typeof $UserNotifications>;

export type UpdateUserNotificationRequest = z.infer<typeof $UpdateUserNotificationRequest>;
export type UpdateUserNotificationResponse = z.infer<typeof $UpdateUserNotificationResponse>;

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
