import { z } from "zod";
import { $uploadedFile } from "@shared/ui";

export const $schemaValidatorCreateUser = z.object({
    email: z.string({ required_error: "Это обязательное поле" }),
    password: z.string({ required_error: "Это обязательное поле" }),
    passwordConfirmation: z.string({ required_error: "Это обязательное поле" }),
    firstName: z.string({ required_error: "Это обязательное поле" }),
    lastName: z.string({ required_error: "Это обязательное поле" }),
    patronymic: z.string({ required_error: "Это обязательное поле" }),
    description: z.string().optional(),
    isActive: z.boolean(),
    roleId: z.string(),
    avatar: $uploadedFile.nullable(),
    additionalImage: $uploadedFile.nullable(),
});

export type UserCreateForm = z.infer<typeof $schemaValidatorCreateUser>;
