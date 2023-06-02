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
    subcategories: z.array(z.string()).min(1, "Выберите подкатегорию"),
    tags: z.array(z.string()).optional(),
});
