import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type UpdateUserFormValidation = z.infer<typeof $UpdateUserFormValidation>;

export const $UpdateUserFormValidation = z.object({
    email: z.string({ required_error: "Это обязательное поле" }).email({ message: "Неверный формат" }),
    firstName: z.string({ required_error: "Это обязательное поле" }),
    lastName: z.string({ required_error: "Это обязательное поле" }),
    patronymic: z.string().optional(),
    isActive: z.boolean(),
    roleId: z.string(),
    avatar: $UploadedFile.nullable(),
    additionalImage: $UploadedFile.nullable(),
});
