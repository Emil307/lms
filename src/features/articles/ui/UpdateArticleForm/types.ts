import { z } from "zod";

export type UpdateArticleFormValidation = z.infer<typeof $UpdateArticleFormValidation>;

export const $UpdateArticleFormValidation = z.object({
    name: z.string({ required_error: "Введите название" }),
    content: z.string({ required_error: "Введите контент" }),
    isActive: z.boolean(),
    categoryId: z.string({ required_error: "Выберите категорию" }).nullable(),
    subcategories: z.array(z.string()).min(1, "Выберите подкатегорию"),
    tags: z.array(z.string()).optional(),
});
