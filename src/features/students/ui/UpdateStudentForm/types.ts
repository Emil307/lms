import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type UpdateStudentFormValidation = z.infer<typeof $UpdateStudentFormValidation>;

export const $UpdateStudentFormValidation = z.object({
    email: z.string({ required_error: "Это обязательное поле" }).email({ message: "Неверный формат" }),
    firstName: z.string({ required_error: "Это обязательное поле" }),
    lastName: z.string({ required_error: "Это обязательное поле" }),
    patronymic: z.string().optional(),
    isActive: z.boolean(),
    roleId: z.string(),
    avatar: $UploadedFile.nullable(),
});
