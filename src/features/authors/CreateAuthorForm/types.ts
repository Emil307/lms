import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type CreateAuthorFormValidation = z.infer<typeof $CreateAuthorFormValidation>;

export const $CreateAuthorFormValidation = z.object({
    firstName: z.string({ required_error: "Введите имя" }).max(32, "Должно быть не более 32 символов"),
    lastName: z.string({ required_error: "Введите фамилию" }).max(32, "Должно быть не более 32 символов"),
    patronymic: z.string().max(32, "Должно быть не более 32 символов").optional(),
    description: z.string().max(230, "Должно быть не более 230 символов").optional(),
    isActive: z.boolean(),
    avatar: $UploadedFile.nullable(),
});
