import { z } from "zod";

export const $UserNotifications = z
    .object({
        newHomework: z.boolean(),
        supportMessage: z.boolean(),
        invoiceForPayment: z.boolean(),
        homeworkChecked: z.boolean(),
        groupAdded: z.boolean(),
    })
    .partial();

export type TUserNotifications = z.infer<typeof $UserNotifications>;
