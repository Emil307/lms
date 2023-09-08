import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type UpdateStudentFormValidation = z.infer<typeof $UpdateStudentFormValidation>;

export const $UpdateStudentFormValidation = z.object({
    email: z.string({ required_error: "Это обязательное поле" }).email({ message: "Неверный формат" }),
    firstName: z.string({ required_error: "Это обязательное поле" }).max(32, "Должно быть не более 32 символов"),
    lastName: z.string({ required_error: "Это обязательное поле" }).max(32, "Должно быть не более 32 символов"),
    patronymic: z.string().max(32, "Должно быть не более 32 символов").optional(),
    isActive: z.boolean(),
    roleId: z.string(),
    avatar: $UploadedFile.nullable(),
});
