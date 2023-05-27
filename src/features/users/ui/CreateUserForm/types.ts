import { z } from "zod";
import { REGEXP_PASSWORD } from "@shared/constant";
import { $UploadedFile } from "@shared/types";

export type CreateUserValidationFormRequest = z.infer<typeof $CreateUserValidationFormRequest>;

export const $CreateUserValidationFormRequest = z
    .object({
        email: z.string({ required_error: "Это обязательное поле" }).email({ message: "Неверный формат" }),
        password: z.string({ required_error: "Это обязательное поле" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        passwordConfirmation: z.string({ required_error: "Это обязательное поле" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        firstName: z.string({ required_error: "Это обязательное поле" }),
        lastName: z.string({ required_error: "Это обязательное поле" }),
        patronymic: z.string().optional(),
        description: z.string().optional(),
        isActive: z.boolean(),
        roleId: z.string(),
        avatar: $UploadedFile.nullable(),
        additionalImage: $UploadedFile.nullable(),
        avatarId: z.number().optional(),
        additionalImageId: z.number().optional(),
        notifications: z.object({
            newHomework: z.boolean(),
            supportMessage: z.boolean(),
            invoiceForPayment: z.boolean(),
        }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Пароли должны совпадать",
        path: ["passwordConfirmation"],
    });
