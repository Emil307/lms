import { z } from "zod";
import { $UploadedFile, Roles } from "@shared/types";

export type UpdateUserFormValidation = z.infer<typeof $UpdateUserFormValidation>;

export const $UpdateUserFormValidation = z
    .object({
        email: z.string({ required_error: "Это обязательное поле" }).email({ message: "Неверный формат" }),
        firstName: z.string({ required_error: "Это обязательное поле" }).max(32, "Должно быть не более 32 символов"),
        lastName: z.string({ required_error: "Это обязательное поле" }).max(32, "Должно быть не более 32 символов"),
        patronymic: z.string().max(32, "Должно быть не более 32 символов").optional(),
        isActive: z.boolean(),
        roleId: z.string(),
        roleName: z.string(),
        description: z.string().optional(),
        avatar: $UploadedFile.nullable(),
        additionalImage: $UploadedFile.nullable(),
    })
    .refine(
        (data) => {
            if (data.roleName !== String(Roles.teacher) || !data.description) {
                return true;
            }
            return data.description.length <= 190;
        },
        {
            message: "Должно быть не более 190 символов",
            path: ["description"],
        }
    );
