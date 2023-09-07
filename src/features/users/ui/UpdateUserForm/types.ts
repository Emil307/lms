import { z } from "zod";
import { $UploadedFile } from "@shared/types";
import { Roles } from "@app/routes";

export type UpdateUserFormValidation = z.infer<typeof $UpdateUserFormValidation>;

export const $UpdateUserFormValidation = z
    .object({
        email: z.string({ required_error: "Это обязательное поле" }).email({ message: "Неверный формат" }),
        firstName: z.string({ required_error: "Это обязательное поле" }),
        lastName: z.string({ required_error: "Это обязательное поле" }),
        patronymic: z.string().optional(),
        isActive: z.boolean(),
        roleId: z.string(),
        description: z.string().optional(),
        avatar: $UploadedFile.nullable(),
        additionalImage: $UploadedFile.nullable(),
    })
    .refine(
        (data) => {
            if (data.roleId !== String(Roles.teacher) || !data.description) {
                return true;
            }
            return data.description.length <= 190;
        },
        {
            message: "Должно быть не более 190 символов",
            path: ["description"],
        }
    );
