import { z } from "zod";

export type CreateAdminCategoryFormValidation = z.infer<typeof $CreateAdminCategoryFormValidation>;

export const $CreateAdminCategoryFormValidation = z.object({
    name: z.string({ required_error: "Введите название" }).max(55, "Должно быть не более 55 символов"),
    isActive: z.boolean().optional(),
    parentId: z.number().nullable(),
});
