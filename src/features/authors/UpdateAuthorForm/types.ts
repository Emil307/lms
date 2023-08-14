import { z } from "zod";
import { $UploadedFile } from "@shared/types";

export type UpdateAuthorFormValidation = z.infer<typeof $UpdateAuthorFormValidation>;

export const $UpdateAuthorFormValidation = z.object({
    firstName: z.string({ required_error: "Введите имя" }),
    lastName: z.string({ required_error: "Введите фамилию" }),
    patronymic: z.string().optional(),
    description: z.string().max(230, "Должно быть не более 230 символов").optional(),
    isActive: z.boolean(),
    avatar: $UploadedFile.nullable(),
});
