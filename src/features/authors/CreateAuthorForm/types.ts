import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type CreateAuthorFormValidation = z.infer<typeof $CreateAuthorFormValidation>;

export const $CreateAuthorFormValidation = z.object({
    firstName: z.string({ required_error: "Введите имя" }),
    lastName: z.string({ required_error: "Введите фамилию" }),
    patronymic: z.string().optional(),
    description: z.string().max(120, "Должно быть не более 120 символов").optional(),
    isActive: z.boolean(),
    avatar: $UploadedFile.nullable(),
});
