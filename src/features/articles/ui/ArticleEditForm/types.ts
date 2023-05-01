import { z } from "zod";

export type UpdateArticleFormValidation = z.infer<typeof $updateArticleFormValidation>;

export const $updateArticleFormValidation = z.object({
    name: z.string({ required_error: "Введите название" }),
    content: z.string({ required_error: "Введите контент" }),
    isActive: z.boolean(),
    categoryId: z
        .string()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите категорию",
        }),
    subcategoryId: z
        .string()
        .nullable()
        .refine((value) => value !== null, {
            message: "Выберите подкатегорию",
        }),

    tags: z.array(z.string()).optional(),
});
