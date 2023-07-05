import { z } from "zod";

export type UpdateArticleFormValidation = z.infer<typeof $UpdateArticleFormValidation>;

export const $UpdateArticleFormValidation = z.object({
    name: z.string({ required_error: "Введите название" }),
    content: z.string({ required_error: "Введите контент" }),
    isActive: z.boolean(),
    categoryId: z.string({ required_error: "Выберите категорию" }),
    subcategories: z.string().array(),
    tags: z.array(z.string()).optional(),
});
