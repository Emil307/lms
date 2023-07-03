import { z } from "zod";

export type UpdateAdminCategoryFormValidation = z.infer<typeof $UpdateAdminCategoryFormValidation>;

export const $UpdateAdminCategoryFormValidation = z.object({
    name: z.string({ required_error: "Введите название" }),
    isActive: z.boolean(),
    parentId: z.number().nullable(),
});
