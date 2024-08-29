import { z } from "zod";
import { $UploadedFile } from "@shared/types";
import { defaultPhoneLength } from "@shared/ui";

export type UpdateStudentFormValidation = z.infer<typeof $UpdateStudentFormValidation>;

export const $UpdateStudentFormValidation = z.object({
    email: z.string({ required_error: "Это обязательное поле" }).email({ message: "Неверный формат" }),
    phone: z.string({ required_error: "Введите телефон" }).length(defaultPhoneLength, `Должно быть ${defaultPhoneLength} цифр`),
    firstName: z.string({ required_error: "Это обязательное поле" }).max(32, "Должно быть не более 32 символов"),
    lastName: z.string({ required_error: "Это обязательное поле" }).max(32, "Должно быть не более 32 символов"),
    patronymic: z.string().max(32, "Должно быть не более 32 символов").optional(),
    isActive: z.boolean(),
    avatar: $UploadedFile.nullable(),
});
