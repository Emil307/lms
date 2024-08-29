import { z } from "zod";
import { REGEXP_PASSWORD } from "@shared/constant";
import { $UploadedFile } from "@shared/types";
import { defaultPhoneLength } from "@shared/ui";

export type CreateStudentValidationFormRequest = z.infer<typeof $CreateStudentValidationFormRequest>;

export const $CreateStudentValidationFormRequest = z
    .object({
        email: z.string({ required_error: "Это обязательное поле" }).email({ message: "Неверный формат" }),
        phone: z.string({ required_error: "Введите телефон" }).length(defaultPhoneLength, `Должно быть ${defaultPhoneLength} цифр`),
        password: z.string({ required_error: "Это обязательное поле" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        passwordConfirmation: z.string({ required_error: "Это обязательное поле" }).regex(REGEXP_PASSWORD, "Неверный формат"),
        firstName: z.string({ required_error: "Это обязательное поле" }).max(32, "Должно быть не более 32 символов"),
        lastName: z.string({ required_error: "Это обязательное поле" }).max(32, "Должно быть не более 32 символов"),
        patronymic: z.string().max(32, "Должно быть не более 32 символов").optional(),
        description: z.string().optional(),
        isActive: z.boolean(),
        avatar: $UploadedFile.nullable(),
        additionalImage: $UploadedFile.nullable(),
        avatarId: z.number().optional(),
        additionalImageId: z.number().optional(),
        notifications: z.object({
            homeworkChecked: z.boolean(),
            groupAdded: z.boolean(),
            supportMessage: z.boolean(),
        }),
    })
    .refine((data) => data.password === data.passwordConfirmation, {
        message: "Пароли должны совпадать",
        path: ["passwordConfirmation"],
    });
